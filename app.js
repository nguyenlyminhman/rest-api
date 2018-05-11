const express = require('express');
const app = express();
const mongoose = require('mongoose');
let Book = require('./models/book');

let bookRouter = express.Router();

let db = mongoose.connect('mongodb://127.0.0.1:27017/bookApi');


bookRouter.route('/books')
    .get((req, res) => {
        let query = {};
        //check query in address bar when title is not exist.
        if(req.query.author){
            query.author = req.query.author;
        }
        //get book infomation.
        Book.find(query, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        })
    })
    //get book by _id
    bookRouter.route('/books/:id')
    .get((req, res) => {
        //get book infomation based on its _id.
        Book.findById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        })
    })


app.use('/api', bookRouter);
app.get('/', (req, res) => {
    res.send('Welcom to my Rest API that builing with NodeJs, ExpressJS, MongoDB etc.');
});

app.listen(3000, () => {
    console.log('Example app listening on port port!', 3000);
});

