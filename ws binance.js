const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

const wss = new WebSocketServer({ port: 9443 });

const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/bnbbtc@depth');

wss.on('connection', (ws) => {
    console.log('connection established');

    ws.on('message', (message) => {
        console.log("Received Client message", message);
    });

    ws.on('close', () => {
        console.log("Connection closed");
    });
});

binanceWS.on('open', () => {
    console.log('Connection to Binance established');
});

binanceWS.on('error', (error) => {
    console.error('Error:', error);
});

binanceWS.on('message', (data) => {
    // Broadcast data from Binance to all connected clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
            // console.log(wss.clients)
        }
    });
});
