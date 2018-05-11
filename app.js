const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
let { db } = require('./common/db-connection');

let bookRouter = require(__dirname+"/router")
//connect to database
mongoose.connect(db());
//using body parser middle ware to manipulate the json, text and encrypt the url 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// get home page
app.get('/', (req, res) => {
    res.send('Welcom to my Rest API that builing with NodeJs, ExpressJS, MongoDB etc.');
});
//book api router
app.use('/api', bookRouter);
//start server
let port = config.get("server.port") || process.env.PORT;
app.listen( port, () => {
    console.log('Example app listening on port port', port);
});

