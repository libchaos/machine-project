#!/usr/bin/env python
#coding: utf-8

import requests
import json


def main():
    url = "http://localhost:4040/jsonrpc"
    headers = {'content-type': 'application/json'}

    # Example echo method
    payload = {
        "method": "predict_simular",
        "params": ["宝宝"],
        "jsonrpc": "2.0",
        "id": 0,
    }
    response = requests.post(
        url, data=json.dumps(payload), headers=headers).json()
    print(response)

    # assert response["result"] == "echome!"
    # assert response["jsonrpc"]
    

if __name__ == "__main__":
    main()
