import sys, requests
import incrementBeverageCounter as beverageCounter
import makeCoffee as coffeeMaker

def getUserConfig(tokenHash):
    res = requests.get("http://localhost:3000/api/getUserByTokenHash?tokenHash=" + tokenHash)
    userData = res.json()
    print userData
    name = userData["name"]
    coffeeMaker.makeCoffee(userData["selectedCoffee"], userData["selectedMilk"], userData["selectedStrength"])
    beverageCounter.increment(name)
