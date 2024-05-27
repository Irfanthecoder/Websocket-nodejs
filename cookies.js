const express = require('express');
const cookie = require('cookie-parser');

const app = express();
app.use(cookie());
app.use(express.json());

const start = app.listen(4000);

start.on('listening', () => console.log("Started"));

app.get('/setcookie', (req, res) => {
res.cookie("1", "Hello", {maxAge: 100000, httpOnly: true /*, secure: true */ });
    res.send('cookie set');
})

app.get('/getcookie', (req, res) => {
    const found = req.cookies["1"];

    if(!found) return console.error("Error");
    res.send(found);
})