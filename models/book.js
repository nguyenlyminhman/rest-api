let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: { type: String },
    author: { type: String },
    gerne: { type: String },
    read: { type: Boolean, default: false }

},{collection: 'book'})

module.exports = mongoose.model('book', bookSchema);