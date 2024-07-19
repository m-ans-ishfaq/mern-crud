const { Schema, models, model } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    }
});

module.exports = { BookModel: models.book || model('book', bookSchema) };