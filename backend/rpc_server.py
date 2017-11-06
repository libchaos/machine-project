from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple

from jsonrpc import JSONRPCResponseManager, dispatcher
import operations

@dispatcher.add_method
def foobar(**kwargs):
    return kwargs["foo"] + kwargs["bar"]


@Request.application
def application(request):
    # Dispatcher is dictionary {<method_name>: callable}
    dispatcher["echo"] = lambda s: s
    dispatcher["add"] = lambda a, b: a + b
    dispatcher["predict_simular"] = operations.predict_simular
    dispatcher["predict_user"] = operations.predict_user
    dispatcher["predict_ques"] = operations.predict_ques
    dispatcher["get_words"] = operations.get_words
    dispatcher["get_phrases"] = operations.get_phrases

    response = JSONRPCResponseManager.handle(
        request.data, dispatcher)
    return Response(response.json, mimetype='application/json')


if __name__ == '__main__':
    run_simple('localhost', 4040, application)

