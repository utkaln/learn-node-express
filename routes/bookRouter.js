const express = require('express');

function routes(Book) {
    // user express provider router object
    const bookRouter = express.Router();
    
    //intercepts url with /books path in it
    bookRouter.route('/books')
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        })

        .get((req, res) => {
            //res.send('Welcome to my Nodemon API');
            //const response = {hello: 'This is my API'};
            //Find is internal method to look up and find everything from resultset
            Book.find(req.query, (err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });

        });

    //url with books followed by db object id
    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            //res.send('Welcome to my Nodemon API');
            //const response = {hello: 'This is my API'};
            Book.findById(req.params.bookId, (err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });

        });
        return bookRouter

}
module.exports = routes;