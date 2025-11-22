// server.js - Backend simulation
const http = require('http');
const fs = require('fs');
const path = require('path');

const users = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'admin' : 'user',
    createdAt: new Date().toISOString()
}));

function requestHandler(req, res) {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (req.url === '/api/data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            console.log('Data received:', body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data stored successfully', timestamp: Date.now() }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found - The resource does not exist on this server.');
    }
}

const server = http.createServer(requestHandler);
server.listen(3000, () => {
    console.log('Server running smoothly on port 3000...');
    console.log('Environment: Production');
    console.log('Database connected...');
});
