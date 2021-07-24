#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');


//HTTP Server
const sendFile = (res, filePath, type) => {
    const fullFilePath = `${__dirname}/${filePath}`;

    res.writeHead(200, {
        'Content-Type': type,
    });

    const readStream = fs.createReadStream(fullFilePath);
        readStream.pipe(res);
};

const httpServer = http.createServer((req, res) => {
    if(req.url === '/') {
        sendFile(res, 'public/index.html', 'text/html');
        return;
    }

    if(req.url === '/js/main.js') {
        sendFile(res, 'public/js/main.js', 'application/javascript');
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    
    // const readStream = fs.createReadStream(FilePath);
    // readStream.pipe(res);
    // return;    
    
});

httpServer.listen(3000, () => {
    console.log((new Date()) + ' Http Server is listening on port 3000');
});

// //WS SERVER
const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on('connection', (socket) => {
    console.log((new Date()) + ' New WS connection');

    let sum = 0;
    socket.on('message', (data) => {
        sum+= Number(data);
        console.log(`Frontend send ${data}`);
        console.log(`Sum ${sum}`);

        if(sum > 10) {
            socket.send(sum);
        }
    });

});