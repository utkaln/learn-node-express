//remember to npm install express first
const express = require('express');
const app = express();

//default port at 3000, otherwise specify port in env setting in package.json
const port = process.env.PORT || 3000;

// user express provider router object
const bookRouter = express.Router();

//mongoose provides all interfaces with mongo db
const mongoose = require('mongoose');

//for mongo version 4 or higher need the second param under connect method
const db = mongoose.connect('mongodb://localhost:27017/bookAPI',{useNewUrlParser:true});
//Custom schema defined in bookModel and imported here
const Book = require('./models/bookModel');

//intercepts url with /books path in it
bookRouter.route('/books')
.get((req,res) => {
    //res.send('Welcome to my Nodemon API');
    //const response = {hello: 'This is my API'};
    //Find is internal method to look up and find everything from resultset
    Book.find(req.query,(err,books) => {
        if(err){
            return res.send(err);
        }
        return res.json(books);
    });   

});

//url with books followed by db object id
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

//register router path with pattern /api
app.use('/api',bookRouter);

//default get url for the REST API
app.get('/', (req,res) => {
    res.send('Welcome to my API');
});


//keeps the node module running for any incoming request, similar to servlet
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});