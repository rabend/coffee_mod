import sys, requests, incrementBeverageCounter, makeCoffee

def main(tokenHash):
    res = requests.get("http://localhost:3000/api/getUserByTokenHash?tokenHash=" + tokenHash)
    userData = res.json()
    print userData
    name = userData["name"]
    makeCoffee.main(userData["selectedCoffee"], userData["selectedMilk"], userData["selectedStrength"])
    incrementBeverageCounter.main(name)

if __name__ == '__main__':
    main(sys.argv[1:])
