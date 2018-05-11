const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let bookRouter = require(__dirname+"/router")
let db = mongoose.connect('mongodb://127.0.0.1:27017/bookApi');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcom to my Rest API that builing with NodeJs, ExpressJS, MongoDB etc.');
});

app.listen(3000, () => {
    console.log('Example app listening on port port!', 3000);
});

