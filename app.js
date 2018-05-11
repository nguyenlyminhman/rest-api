const express = require('express');
const app = express();
const mongoose = require('mongoose');
let Book = require('./models/book');

let bookRouter = express.Router();

let db = mongoose.connect('mongodb://127.0.0.1:27017/bookApi');


bookRouter.route('/books')
    .get((req, res) => {
        Book.find((err, data) => {
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

