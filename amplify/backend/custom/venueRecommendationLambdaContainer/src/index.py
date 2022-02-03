import pickle
import boto3
import pandas as pd
from scipy.sparse import csr_matrix, lil_matrix
from sklearn.neighbors import NearestNeighbors


s3 = boto3.resource('s3')

def load_obj(pickled_file):
    s3.Bucket("evenuefs-recsys").download_file(pickled_file, f'/tmp/{pickled_file}')
    with open(f'/tmp/{pickled_file}', 'rb') as handle:
        loaded_obj = pickle.load(handle)
        return loaded_obj

knn = load_obj("evenue-rating-knn.pickle")
venue_id_mapping = load_obj("venue_id_mapping.pickle")
user_id_mapping = load_obj("user_id_mapping.pickle")
s3.Bucket("evenuefs-recsys").download_file(
    "airbnb-reviews-eng-norm-scored-debot-latest.zip",
    '/tmp/airbnb-reviews-eng-norm-scored-debot-latest.zip'
)
latest_dataset_df = pd.read_csv('/tmp/airbnb-reviews-eng-norm-scored-debot-latest.zip', sep=';')

def build_matrix(dataset, rating_strat):
    n_listings = dataset.venue_id.unique().shape[0]
    n_reviewers = dataset.user_id.unique().shape[0]
    A = lil_matrix((n_listings, n_reviewers), dtype='int')
    for row in dataset.itertuples():
        A[row.venue_id, row.user_id] = rating_strat(row)
    return A.tocsr()

def enhanced_rating(virtual_rating, rating=0):
    if pd.isna(rating) or not rating:
        return virtual_rating
    return (rating + virtual_rating) / 2

rating_strat_enhanced = lambda row: enhanced_rating(row.sentiment_score, rating=row.rating)
rating_strat_provided = lambda row: row.rating

umatrix = build_matrix(latest_dataset_df, rating_strat_enhanced)

def venues_rated_by_user(user_id, dataset_df, limit):
    dataset_sorted_desc = dataset_df.sort_values(['user_id', 'created_at'], ascending=[True, False])
    venue_filter = dataset_sorted_desc[dataset_sorted_desc['user_id'] == user_id].venue_id
    return venue_filter.tolist()[:limit]

def gen_recommendations(knn, item_filter, umatrix, num, debug=False):
    distances = []
    indices = []
    for i in item_filter:
        distances, indices_i = knn.kneighbors(umatrix[i], n_neighbors=num)
        if debug:
            print(distances)
            print(indices_i)
        indices.extend(indices_i.flatten()[1:])
    return list(dict.fromkeys(indices))


def handler(event, context):
    print(event)
    user_id = event["user"]
    recent_venue_count = 6
    rated_venue_indices = venues_rated_by_user(user_id_mapping[user_id], latest_dataset_df, recent_venue_count)
    num = 3
    rec_venue_indices = gen_recommendations(knn, rated_venue_indices, umatrix, num, debug=True)
    print(rec_venue_indices)
    rev_venue_id_mapping = {v: k for k, v in venue_id_mapping.items()}
    rec_venue_ids = [rev_venue_id_mapping[vidx] for vidx in rec_venue_indices]
    print(rec_venue_ids)
    return rec_venue_ids
