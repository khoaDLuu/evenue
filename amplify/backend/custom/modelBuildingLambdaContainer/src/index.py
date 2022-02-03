from decimal import Decimal
import pickle
import boto3
import pandas as pd
from scipy.sparse import lil_matrix
from sklearn.neighbors import NearestNeighbors


infile = "airbnb-reviews-eng-norm-scored-debot.zip"
s3 = boto3.resource('s3')
s3.Bucket("evenuefs-recsys").download_file(infile, f'/tmp/{infile}')
dataset_df = pd.read_csv(f'/tmp/{infile}', sep=';')
dataset_df.rename(
    columns={'listing_id': 'venue_id', 'reviewer_id': 'user_id', 'date': 'created_at', 'comments': 'comment', 'comment_sentiment_score': 'sentiment_score'},
    inplace=True,
)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('rsratings-dev')

def fetch_latest_data(table):
    response = table.scan()
    items = response['Items']
    new_data_df = pd.DataFrame(items)
    new_data_df.head(n=3)  #
    return new_data_df

def load_dataset(dataset_df, table):
    latest_data_df = fetch_latest_data(table)
    latest_dataset_df = pd.concat([dataset_df, latest_data_df], sort=False, ignore_index=True)
    print("latest_dataset_df ", len(latest_dataset_df))
    return latest_dataset_df

def save_obj(obj, localfile, s3):
    with open(f'/tmp/{localfile}', 'wb') as handle:
        pickle.dump(obj, handle)
    s3.Bucket("evenuefs-recsys").upload_file(f'/tmp/{localfile}', localfile)

def id_mapping(dataset, col):
    unique_ids = dataset[col].unique()
    return {uid: index for index, uid in enumerate(unique_ids)}

def id_normalized(dataset, mappings):
    for col, mapping in mappings.items():
        dataset[col] = dataset[col].apply(lambda x: mapping[x])
    return dataset

def build_matrix(dataset, rating_strat):
    n_listings = dataset.venue_id.unique().shape[0]
    n_reviewers = dataset.user_id.unique().shape[0]
    A = lil_matrix((n_listings, n_reviewers), dtype='int')
    for row in dataset.itertuples():
        A[row.venue_id, row.user_id] = rating_strat(row)
    return A.tocsr()

def compute_similarity(umatrix):
    knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=4, n_jobs=-1)
    knn.fit(umatrix)
    return knn

def enhanced_rating(virtual_rating, rating=0):
    if pd.isna(rating) or not rating:
        return virtual_rating
    return (rating + Decimal(virtual_rating)) / 2

rating_strat_enhanced = lambda row: enhanced_rating(row.sentiment_score, rating=row.rating)
rating_strat_provided = lambda row: row.rating

def build_artifacts(latest_dataset_df):
    venue_id_mapping = id_mapping(latest_dataset_df, "venue_id")
    user_id_mapping = id_mapping(latest_dataset_df, "user_id")
    normd_dataset_df = id_normalized(latest_dataset_df, {"venue_id": venue_id_mapping, "user_id": user_id_mapping})
    umatrix = build_matrix(normd_dataset_df, rating_strat_enhanced)
    model = compute_similarity(umatrix)
    return model, normd_dataset_df, venue_id_mapping, user_id_mapping

def save_artifacts(artifs, s3):
    model, normd_dataset_df, venue_id_mapping, user_id_mapping = artifs
    save_obj(model, "evenue-rating-knn.pickle", s3)
    save_obj(venue_id_mapping, "venue_id_mapping.pickle", s3)
    save_obj(user_id_mapping, "user_id_mapping.pickle", s3)
    normd_dataset_df.to_csv(
        '/tmp/airbnb-reviews-eng-norm-scored-debot-latest.zip',
        sep=';',
        compression=dict(
            method='zip', archive_name='airbnb-reviews-eng-norm-scored-debot-latest.csv'
        )
    )
    s3.Bucket("evenuefs-recsys").upload_file(
        '/tmp/airbnb-reviews-eng-norm-scored-debot-latest.zip',
        "airbnb-reviews-eng-norm-scored-debot-latest.zip"
    )


def handler(event, context):
    print(event)
    latest_dataset_df = load_dataset(dataset_df, table)
    artifs = build_artifacts(latest_dataset_df)
    save_artifacts(artifs, s3)
