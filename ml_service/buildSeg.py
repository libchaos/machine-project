import os
import pandas
import logging
from analyse.analyzer import ChineseAnalyzer


if __name__ == "__main__":

    dataPath = lambda filename: os.path.join('../data_process/public', filename)
    data = pandas.read_csv(dataPath('data.csv'))
    analyzer = ChineseAnalyzer()
    mycut = lambda s: [t.text for t in analyzer(s)]
    space = " "
    with open('text_seg', 'w') as output:
   
        for item in data['content']:
            print(item)
            output.write(space.join(mycut(item)) + "\n")

    logging.info('SAVED')