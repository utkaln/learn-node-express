const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/bookAPI',{useNewUrlParser:true});
const Book = require('./models/bookModel');

bookRouter.route('/books')
.get((req,res) => {
    //res.send('Welcome to my Nodemon API');
    //const response = {hello: 'This is my API'};
    Book.find(req.query,(err,books) => {
        if(err){
            return res.send(err);
        }
        return res.json(books);
    });   

});

bookRouter.route('/books/:bookId')
.get((req,res) => {
    //res.send('Welcome to my Nodemon API');
    //const response = {hello: 'This is my API'};
    Book.findById(req.params.bookId,(err,books) => {
        if(err){
            return res.send(err);
        }
        return res.json(books);
    });   

});

app.use('/api',bookRouter);

app.get('/', (req,res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});