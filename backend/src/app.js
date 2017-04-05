const http = require('http');

const server = http.createServer((req, res) => {
    const data = {
        body: ["Coffee", "Latte", "Cappucino"]
    };

    const json = JSON.stringify(data);

    res.writeHead(200, {
        "content-type": "application/json"
    });
    res.write(json);
    res.end();
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});