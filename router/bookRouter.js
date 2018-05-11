let express = require("express");
let Book = require('../models/book');
let bRouter = express.Router();


bRouter.route('/books')
//save new book informations to database 
.post((req,res)=>{
    let book = new Book(req.body);
    book.save();
    res.status(201).send(book);
})
//get all book or get book by its author.
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
bRouter.route('/books/:id')
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

module.exports = bRouter;