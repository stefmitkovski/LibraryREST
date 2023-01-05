const express = require('express')
const { getBooks, postBooks, loanBook, returnBook, deleteBook} = require('../controllers/bookController')
const router = express.Router()

router.route('/').get(getBooks).post(loanBook).put(returnBook).delete(deleteBook)
router.route('/create').post(postBooks)

module.exports = router