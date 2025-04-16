const http = require('http');
const CustomStream = require('./CustomStream'); 

const host = 'localhost';
const port = 3002;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    const customStream = new CustomStream(); 
    process.stdin.pipe(customStream); 

    res.end('Processing input from console. Check logs.'); 
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
