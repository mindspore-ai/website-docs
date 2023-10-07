import sys
import requests
import json

access_token = sys.argv[1]
url = sys.argv[2]
data = {
    "access_token": access_token,
    "title": "dev sync to master",
    "head": "dev",
    "base": "master"
}

headers = {
    "Content-Type": "application/json;charset=UTF-8"
}

response = requests.post(url, data=json.dumps(data), headers=headers)


if response.status_code == 201:
    print("clear sync pr success")
    number = response.json()['number']
    print("pr nubmer: " + str(number))

    pullUrl = url + '/' + str(number) + '/merge'
    pullData = {
        "access_token": access_token,
        "merge_method": "merge"
    }

    pullResponse = requests.put(pullUrl, data=json.dumps(pullData), headers=headers)
    print("merge response code: " + str(pullResponse.status_code))
    print("merge response data: " + str(pullResponse.json()))
    
    if pullResponse.status_code != 200:
        print("merge pr fail")
else:
    print("clear sync pr fail")
    print("response code: " + str(response.status_code))
    print("response data: " + str(response.json()))
