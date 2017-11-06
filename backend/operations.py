import gensim
import jieba.posseg as pseg
from helpler import filterPid
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ml_service'))

from phrase_extractor import get_phrases


model = gensim.models.Word2Vec.load('../ml_service/text.model')

user = gensim.models.Word2Vec.load('../ml_service/user.model')

ques = gensim.models.Word2Vec.load('../ml_service/ques.model')




def predict_simular(vacabulary):
    try:
        result = model.most_similar(vacabulary)
        return result
    except: 
        return ''



def predict_user(item):
    try:
        result = user.most_similar(item)
        
        print(result)
        users = []
        for userx, _ in result:
            print(userx)
            users.append(userx)
        return users
    except:
        return ''


def predict_ques(item):
    try:
        result = ques.most_similar(positive=[item], topn=10000)
        result = str(result)
        result = filterPid(result)
        return result
    except:
        return ''





# result = predict_simular('三阳')

# print(result)

'''
    input: '这是一个问题'
    return: ['问题'] noun
'''
def get_words(sentence):

    words = pseg.cut(sentence)
    result = []
    for word, flag in words:
        if flag in ['ad', 'ag', 'c', 'dg', 'e', 'f', 'r', 'y']:
            continue
        result.append(word)
    return result




if __name__ == '__main__':
    
    text = "<李磊>家长您好，感谢咨询，仔细看了您的描述后给您提供以下参考信息 1： 血常规 有病毒感染 无症状（鼻塞流涕发热） 一般是不要紧 无贫血 后期在复查一下就行    2：关于吃奶的情况考虑还是厌奶的可能性比较大的   一方面 宝宝的体内乳糖酵素开始减少，舌头的味觉也开始产生变化，胃口开始改变。另一方面，他的听觉视觉有了突破性的进展，使得他对外界更感兴趣，往往一有风吹草动就去“管闲事”，心思不在吃奶上了。 那么建议就要在喂奶的时候保证周围环境的安静 在宝宝饿了的时候在喂养。不要强喂 ，平时多给宝宝做抚触按摩促进能量消耗增加食欲 3：关于体重增长的情况   这个月份体重在4.3-6.0kg就是正常的<李磊>"   
    res = ['血常规', '病毒感染', '鼻塞', '流涕', '贫血', '吃奶', '厌奶', '乳糖', '酵素', '舌头', '味觉', '胃口', '视觉', '吃奶', '能量消耗', '食欲']
    # print(get_phrases(text))

    # print(predict_ques(res[0]))

    
    print(predict_user('陆美华'))