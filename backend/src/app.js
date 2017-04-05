const express = require('express');
const Repository = require('./repository.js');
const bodyParser = require('body-parser');

const app = express();
const repo = new Repository("//home/rabend/coffee_users");

app.use(bodyParser.json());

app.get('/getUser', (req, res) => {
    const userName = req.query.userName;
    const roman = repo.getUser(userName);

    const json = JSON.stringify(roman);
    res.send(json);
});

app.post('/', (req, res) => {
    const data = req.body;
    repo.saveUser(data);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});