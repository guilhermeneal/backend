const express = require('express');

const fs = require('fs');

const app = express();

const port = 4000;

var server = app.listen(8081, function () {
});

app.get("/", (req, res) => {
    log(req,res);
    var body = "Hello World";
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

function log(req, res) {
    var log = `${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}\n`;
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        }
    });
}

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});