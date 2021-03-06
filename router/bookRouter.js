let express = require("express");
let Book = require('../models/book');
let bRouter = express.Router();


bRouter.route('/')
    //save new book informations to database 
    .post((req, res) => {
        let book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    //get all book or get book by its author.
    .get((req, res) => {
        let query = {};
        //check query in address bar when title is not exist.
        if (req.query.author) {
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
//using middle ware
bRouter.use('/:id', (req, res, next) => {
    //get book infomation based on its _id.
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else if (data) {
            req.book = data;
            next();
        } else {
            res.status(404).send('Book is not found')
        }
    })
})
//get book by _id
bRouter.route('/:id')
    .get((req, res) => {
        res.json(req.book);
    })
    //update book based on its id. Note: using for add new field 
    .put((req, res) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    })
    //update book information based on its id. Note: using for update specified field
    .patch((req, res) => {
        if (req.body._id)
            delete req.body._id;

        for (let p in req.body) {
            req.book[p] = req.body[p];
        }
        req.book.save(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    })
    //remove a document base on its id.
    .delete((req, res) => {
        req.book.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send("Removed");
            }
        });
    })

module.exports = bRouter;