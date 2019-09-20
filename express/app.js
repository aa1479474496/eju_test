const express = require('express');
const app = express();

let port = process.env.port || 3000;


app.get('/', (req, res) => {
    res.send('Hello world!');
});

const routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log('example app listening on port 3000!');
});