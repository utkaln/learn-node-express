/* eslint-disable no-param-reassign */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const express = require('express');

const booksController = require('../controllers/booksController');

function routes(Book) {
  // user express provider router object
  const bookRouter = express.Router();
  const controller = booksController(Book);
  // intercepts url with /books path in it
  bookRouter.route('/books')
    .post(controller.post)

    .get(controller.get);

  // add middleware to deal with requests with a book id
  // use middleware to manipulate request object
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });


  // url with books followed by db object id
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))

    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })


    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}
module.exports = routes;
