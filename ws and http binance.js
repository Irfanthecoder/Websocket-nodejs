const express = require('express');
const { WebSocketServer } = require('ws');
const axios = require('axios');

const app = express();
app.use(express.json());

const server = app.listen(3000, () => {
    console.log("Server Started");
});

const wbsocket = new WebSocketServer({server});

wbsocket.on('connection', (ws) => {
    console.log("WebSocket connection established");

    ws.on('message', (message) => {
        console.log("Received message from client:", message);
    });

    const fetchData = () => axios.get('https://api.binance.com/api/v3/depth?symbol=ETHBTC&limit=10').then(response => {
        ws.send(JSON.stringify(response.data));
    })

    fetchData();
    let keepUpdate = setInterval(fetchData, 100);

    ws.on('close', () => {
        console.log("WebSocket connection closed");
        clearInterval(keepUpdate);
    })

    ws.on('customEvent', () => console.log("Custom event for Testing"));

    ws.send("Sent data from server");

    ws.emit('customEvent')
});