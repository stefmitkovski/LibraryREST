const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')

// @desc    Get all books that have a tag free
// @route   GET /api/books
// @acccess Private

const getBooks = asyncHandler(async (req,res) =>{

    const books = await Book.find({'status': 'free'})

    res.status(200).json(books)

})

// @desc    Create a book
// @route   POST /api/books/create
// @acccess Private

const postBooks = asyncHandler(async (req, res) =>{
    if(!req.body){
        res.status(400)
        throw new Error('Your missing some parameters')
    }

    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        status: req.body.status
    })

    res.status(200).json(book)
})

// @desc    Loan a book
// @route   POST /api/books/lend/:id
// @acccess Private

const loanBook = asyncHandler(async(req,res) =>{
    
    if(!req.params.id){
        res.status(400)
        throw new Error('You forgot to enter the id of the book')
    }

    const book = await Book.findById(req.params.id).select("status") 

    if(book == null){
        res.status(400).json({msg: "The book doesn't exists"})
    }else if(book.status == "free"){
        res.status(200).json("The book is free")
    }else{
        res.status(200).json("The book is not free")
    }

})

// @desc    Return a book
// @route   PUT /api/books/:id
// @acccess Private

const returnBook = (req,res) =>{

    if(!req.params.id){
        res.status(400)
        throw new Error('You forgot to enter the id of the book')
    }

    // const book = await Book.findById(req.params.id) 


    res.status(200).json({
        msg: "Return a book"
    })
}

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @acccess Private

const deleteBook = asyncHandler(async(req,res) =>{

    if(!req.params.id){
        res.status(400)
        throw new Error('You forgot to enter the id of the book')
    }

    const book = await Book.findByIdAndDelete(req.params.id)
    
    if(book == null){
        res.status(400).json({msg: "The book doesn't exist"})
    }else{
        res.status(200).json({msg: "Sucessfully deleted the book"})
    }
        
})

module.exports = {
    getBooks,
    postBooks,
    loanBook,
    returnBook,
    deleteBook
}