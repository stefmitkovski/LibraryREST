const express = require('express')
const router = express.Router()
const { registerUser, loginUser, myBooks} = require('../controllers/userController')

router.route('/register').post(loginUser)
router.route('/login').post(registerUser)
router.route('/me').get(myBooks)

module.exports = router