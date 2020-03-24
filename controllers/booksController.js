function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if(!req.body.title){
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    // res.send('Welcome to my Nodemon API');
    // const response = {hello: 'This is my API'};
    // Find is internal method to look up and find everything from resultset
    Book.find(req.query, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }
  return { post, get };
}
module.exports = booksController;
