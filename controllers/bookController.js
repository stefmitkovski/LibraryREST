// const asyncHandler = require('express-async-handler')

// @desc    Get all books that have a tag free
// @route   GET /api/books
// @acccess Public

const getBooks = (req,res) =>{
    res.status(200).json({
        msg: "View all books"
    })
}

// @desc    Create a book
// @route   POST /api/books
// @acccess Private

const postBooks = (req, res) =>{
    res.status(200).json({
        msg: "Create a book"
    })
}

// @desc    Loan a book
// @route   POST /api/books
// @acccess Private

const loanBook = (req,res) =>{
    res.status(200).json({
        msg: "Loan a book"
    })
}

// @desc    Return a book
// @route   PUT /api/books
// @acccess Private

const returnBook = (req,res) =>{
    res.status(200).json({
        msg: "Return a book"
    })
}

// @desc    Delete a book
// @route   DELETE /api/books
// @acccess Private

const deleteBook = (req,res) =>{
    res.status(200).json({
        msg: "Delete a book"
    })
}

module.exports = {
    getBooks,
    postBooks,
    loanBook,
    returnBook,
    deleteBook
}