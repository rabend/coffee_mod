import requests

user = {"userName" : "TestUser"}

r = requests.post('http://localhost:3000/api/incrementBeverage', json = user)
print r.text