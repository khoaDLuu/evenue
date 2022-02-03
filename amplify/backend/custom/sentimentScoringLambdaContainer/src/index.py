import os
import pickle
import io
import boto3
import numpy as np
import pandas as pd
import tensorflow as tf


s3 = boto3.resource('s3')
s3.Bucket("evenuefs-recsys").download_file(
    'evenue-review-sentiment-trained.h5',
    '/tmp/evenue-review-sentiment-trained.h5'
)
s3.Bucket("evenuefs-recsys").download_file(
    'evenue-review-tokenizer.pickle',
    '/tmp/evenue-review-tokenizer.pickle'
)

evenue_sentiment_model = tf.keras.models.load_model('/tmp/evenue-review-sentiment-trained.h5')
maxlen = 200
with open('/tmp/evenue-review-tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)


def predict_rating(reviews, model, tokenizer, maxlen):
    return [
        np.argmax(p) + 1
        for p in model.predict(
            tf.keras.preprocessing.sequence.pad_sequences(
                tokenizer.texts_to_sequences(reviews),
                maxlen=maxlen
            )
        )
    ]

calc_virtual_rating = lambda review: predict_rating([review], evenue_sentiment_model, tokenizer, maxlen)[0]


def handler(event, context):
    print(event)
    virtual_rating = calc_virtual_rating(event.get("comment"))
    print("virtual_rating = ", virtual_rating)
    return int(virtual_rating)
