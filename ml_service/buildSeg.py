import os
import pandas
import logging
from analyse.analyzer import ChineseAnalyzer

from semsim_train import MySentences


if __name__ == "__main__":

    # dataPath = lambda filename: os.path.join('../data_process/public', filename)
    # data = pandas.read_csv(dataPath('data.csv'),  error_bad_lines=False)
    # analyzer = ChineseAnalyzer()
    # mycut = lambda s: [t.text for t in analyzer(s)]
    # space = " "
    # with open('text_seg', 'w') as output:
   
    #     for item in data['content']:
    #         # print(item)
    #         print(space.join(mycut(item)))
    #         # output.write(space.join(mycut(item)) + "\n")

    # filename = 'data.csv'
    # sentences = MySentences(filename)
    # space = " "
    # with open('ques_seg', 'w') as output1:
        
    #     for sent in sentences:
    #         output1.write(space.join(sent) + "\n")


    filename = 'user.csv'
    dataPath = lambda filename: os.path.join('../data_process/public', filename)
    data = pandas.read_csv(dataPath(filename),  error_bad_lines=False)
    with open('user_seg', 'w') as output2:
        for _, row in data.iterrows():
            sent = row['user'] + ' ' + row['doctors'] + '\n'
            output2.write(sent)


    logging.info('SAVED')