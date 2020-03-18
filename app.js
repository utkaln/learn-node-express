//remember to npm install express first
const express = require('express');
const app = express();

//default port at 3000, otherwise specify port in env setting in package.json
const port = process.env.PORT || 3000;


//mongoose provides all interfaces with mongo db
const mongoose = require('mongoose');


//for mongo version 4 or higher need the second param under connect method
const db = mongoose.connect('mongodb://localhost:27017/bookAPI',{useNewUrlParser:true,useUnifiedTopology: true});
//Custom schema defined in bookModel and imported here
const Book = require('./models/bookModel');

const bookRouter = require('./routes/bookRouter')(Book);

//import body parser to manipulate req.body
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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