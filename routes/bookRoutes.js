const express = require('express')
const { getBooks, postBooks, loanBook, returnBook, deleteBook} = require('../controllers/bookController')
const router = express.Router()

router.route('/').get(getBooks)
router.route('/:id').put(returnBook).delete(deleteBook)
router.route('/lend/:id').post(loanBook)
router.route('/create').post(postBooks)

module.exports = router