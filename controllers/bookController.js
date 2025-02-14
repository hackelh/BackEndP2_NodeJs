   const Book = require('../models/BookModel');
   exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: req.body.imageUrl
    });
    book.save().then(createdBook => {
        res.status(201).json({
            message: 'Book created successfully!',
            book: createdBook
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Creating a book failed!'
    });
});
};   exports.getBooks = (req, res) => {
    Book.find().then(books => {
        res.status(200).json(books);
        ;
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching books failed!'
        });
  } );
};

