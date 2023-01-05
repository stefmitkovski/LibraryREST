const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, myBooks} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(protect, logoutUser)
router.route('/me').get(protect, myBooks)

module.exports = router