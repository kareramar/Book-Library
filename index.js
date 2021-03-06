const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', api);

const server=app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = server;