const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const route = require('./src/routers/index.js');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', route);
app.listen(port, () => {
    console.log(`App Listen post ${port}`);
});