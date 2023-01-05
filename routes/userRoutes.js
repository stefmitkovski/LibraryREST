const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, myBooks} = require('../controllers/userController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me').get(myBooks)

module.exports = router