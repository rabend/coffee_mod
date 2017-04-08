import sys, requests, incrementBeverageCounter

def main(tokenHash):
    res = requests.get("http://localhost:3000/api/getUserByTokenHash?tokenHash=" + tokenHash)
    userData = res.json()
    name = userData["name"]

    incrementBeverageCounter.main(name)

if __name__ == '__main__':
    main(sys.argv[1:])
