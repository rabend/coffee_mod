import sys, getopt, requests

def main(arg1):
    if arg1 == "":
        sys.exit(2)
    username = arg1
    user = {"userName" : username}
    r = requests.post('http://localhost:3000/api/incrementBeverage', json = user)
    print r.text

if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))