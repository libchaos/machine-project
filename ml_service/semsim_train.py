import os
import pandas as pd
import gensim
import logging
import argparse
import sys

from phrase_extractor import get_phrases

logger = logging.getLogger(__name__)

def process_phrase(text):
    phrases = get_phrases(text)
    return ' '.join(phrases)


def pre_process(m):
    m = [i for i in m.split()]
    m = [i.strip("./@!#") for i in m]
    return m



class MySentences:
    def __init__(self, filename):
        self.filename = filename

    def __iter__(self):
        dataPath = lambda filename: os.path.join('../data_process/public', filename)
      
        data = pd.read_csv(dataPath(self.filename), error_bad_lines=False)
        print(data.count())
        count = 0
        l = 0
        for _, row in data.iterrows():
            content = row['content']
            title = row['title']
            tags = row['tags']
            description = row['description']
            user = row['user']
            doctor = row['doctor']
            all_text = title + tags + description + content
            all_text = process_phrase(all_text)
            count += 1
            final_data =  "<" + doctor + "> "+ all_text + " <" + doctor + ">"
            sents = pre_process(final_data)
            l += len(sents)
            print('Count: ', count)
            yield sents




def train(filename, model_path):
    sentences = MySentences(filename)
    model = gensim.models.Word2Vec(sentences, min_count=10,  workers=8, negative=3, sg=0, size = 300, sample=1e-4, hs=1, window = 10)
    model.init_sims(replace=True)
    model.save(model_path)



if __name__ == "__main__":
    logging.root.setLevel(level=logging.INFO)
    logger.info("running %s", ' '.join(sys.argv))

    # check and process cmdline input
    program = os.path.basename(sys.argv[0])
    if len(sys.argv) < 2:
        print(globals()['__doc__'] % locals())
        sys.exit(1)
    
    parser = argparse.ArgumentParser()
    
    parser.add_argument(
        "-d", "--data", required=True,
        help="Input data folder.")
    parser.add_argument(
        "-m", "--model_output", required=True,
        help="Output model file, in word2vec format")
    args = parser.parse_args()
    
    data_folder, model_path = (args.data, args.model_output)
    logger.info('Picking data from %s...', data_folder)
    
    train(data_folder, model_path)
    
    logger.info("Saving model file %s in %s", model_path, os.path.abspath(model_path))
    logger.info("Finished running %s", program)




            
