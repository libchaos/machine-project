import gensim
import jieba.posseg as pseg


model = gensim.models.Word2Vec.load('../ml_service/text.model')



def predict_simular(vacabulary):
    try:
        result = model.most_similar(vacabulary)
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


