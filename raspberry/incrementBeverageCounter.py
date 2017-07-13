import sys, getopt, requests

def increment(userName):
    if arg1 == "":
        sys.exit(2)
    user = {"userName" : userName}
    r = requests.post('http://localhost:3000/api/incrementBeverage', json = user)
    print r.text
