from db import MineDB
from gensim.models.doc2vec import TaggedDocument
from gensim.models import Phrases

from gensim.models.doc2vec import Doc2Vec

db = MineDB('localhost', 'turing', 'tmc_inquiry_question_chat_log')


class QuesDocIterator:

    def __init__(self):
        # self.phrase = Phrases.load("phrases")
        pass
    def __iter__(self):
        all_logs = db.query()
        for doc in all_logs:
            yield TaggedDocument(words=doc['content'], tags=[doc['question_root']])


quesDocIter = QuesDocIterator()

model = Doc2Vec(quesDocIter, size=100, window=5, min_count=5, negative=20, workers=6, iter=4)
print("saving model!")

model.save("doc2vec_model")
print("model saved")