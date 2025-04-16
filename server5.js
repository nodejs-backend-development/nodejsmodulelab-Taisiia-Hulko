const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const host = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
    let firstChunk = true;
    let headers = [];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('['); 

    const stream = fs.createReadStream('data.csv')
        .pipe(split2()) 
        .pipe(through2.obj(function (chunk, enc, callback) {
            const row = chunk.split(',').map(val => val.trim()); 
            if (!headers.length) {
                headers = row; 
                return callback(); 
            }

            const obj = row.reduce((acc, val, index) => {
                acc[headers[index]] = val;
                return acc;
            }, {});

            if (!firstChunk) this.push(',');
            firstChunk = false;

            this.push(JSON.stringify(obj));
            callback();
        }));

    stream.on('data', (data) => {
        res.write(data); 
    });

    stream.on('end', () => {
        res.end(']'); 
    });

    stream.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading or processing file');
    });
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
