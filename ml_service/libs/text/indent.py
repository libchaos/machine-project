import numpy as np 
import os.path
import pickle
import json
from termcolor import colored
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder


def new(intent_labels=[], method='kmeans'):

    methods = {
        'kmeans': KMeans(n_clusters=len(intent_labels))
    }
    encoder = LabelEncoder()
    encoder.fit(intent_labels)

    return {
        'clf': methods[method],
        'encoder': encoder
    }


def save(operations, path):
    with open(path, 'wb+') as f:
        pickle.dump(operations, f)


def load(path):
    with open(path, 'rb') as f:
        return pickle.load(f)


def safe_load(path):
    if os.path.isfile(path):
        print(colored('Text intent classifier loaded.', 'cyan'))
        return load(path)
    else:
        print(colored('Text intent classifier created....', 'yellow'))
        return new()


def classify(opr):
    def classify_us(vectors):
        vs = opr['clf'].predict(vectors)
        return opr['encoder'].inverse_transform(vs)
    return classify_us

def train(opr):
    def fit(vectors, labels):
        numeric_labels = opr['encoder'].transform(labels)
        opr['clf'].fit(vectors, numberic_labels)
    return fit
