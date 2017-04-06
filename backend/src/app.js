const express = require('express');
const Repository = require('./repository.js');
const bodyParser = require('body-parser');
const path = require('path');

const rootPath = "/home/rabend/projects/coffee_mod/";
const app = express();
const repo = new Repository("/home/rabend/coffee_users");

app.use(bodyParser.json());
app.use(express.static(rootPath));

app.get('/', (req, res) => {
    const main = path.resolve(rootPath, 'frontend/', 'lib/','main.html');
    res.header('content-type', 'text/html');
    res.sendfile(main);
});

app.get('/api/getUser', (req, res) => {
    const userName = req.query.userName;
    const roman = repo.getUser(userName);

    const json = JSON.stringify(roman);
    res.send(json);
});

app.post('/api/saveUser', (req, res) => {
    const data = req.body;
    repo.saveUser(data);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});