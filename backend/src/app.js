const express = require('express');
const Repository = require('./repository.js');
const bodyParser = require('body-parser');
const path = require('path');

const rootFolder = path.join(__dirname, '../../');
const app = express();
debugger;
const repo = new Repository(path.join(rootFolder, "coffee_users"));

app.use(bodyParser.json());
app.use(express.static(rootFolder));

app.get('/', (req, res) => {
    const main = path.resolve(rootFolder, 'frontend/', 'lib/','main.html');
    res.header('content-type', 'text/html');
    res.status(200);
    res.sendfile(main);
});

app.get('/api/getUser', (req, res) => {
    const userName = req.query.userName;
    const user = repo.getUser(userName);

    const json = JSON.stringify(user);
    res.status(200);
    res.send(json);
});

app.post('/api/saveUser', (req, res) => {
    const data = req.body;
    repo.saveUser(data);
    res.sendStatus(200);
});

app.post('/api/incrementBeverage', (req, res) => {
    const userName = req.body.userName;
    repo.incrementBeverageCount(userName);
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});