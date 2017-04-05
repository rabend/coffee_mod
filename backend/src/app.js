const http = require('http');
const Repository = require('./repository.js');

const server = http.createServer((req, res) => {
    const data = {
        body: ["Coffee", "Latte", "Cappucino"]
    };

    const repo = new Repository("/home/rabend/coffee_users");
    const roman = repo.getUser("rabend");

    const json = JSON.stringify(roman);

    res.writeHead(200, {
        "content-type": "application/json"
    });
    res.write(json);
    res.end();
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});