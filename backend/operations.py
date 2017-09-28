import gensim


model = gensim.models.Word2Vec.load('../ml_service/text.model')



def predict_simular(vacabulary):
    try:
        result = model.most_similar(vacabulary)
        return result
    except: 
        return ''



result = predict_simular('三阳')

print(result)
    