const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

// @desc    Register a user
// @route   POST /api/users/register
// @acccess Public

const registerUser = asyncHandler( async(req,res) =>{
    const { name, email, password} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Your missing some parameters')
    }
    
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid user data')        
    }
})

// @desc    Login in
// @route   POST /api/users/login
// @acccess Public

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Login in
// @route   POST /api/users/logout
// @acccess Public

const logoutUser = (req, res) =>{
    res.status(200).json({
        msg: "Logout user"
    })
}

// @desc    View all books that are mine
// @route   GET /api/users/me
// @acccess Private

const myBooks = (req, res) =>{
    res.status(200).json({
        msg: "My books"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    myBooks
}