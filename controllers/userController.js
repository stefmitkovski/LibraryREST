const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Book = require('../models/bookModel')
const Lending = require('../models/lendingModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc    Register a user
// @route   POST /api/users/register
// @acccess Private

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
        password: hashedPassword,
    })
    const token = generateToken(user._id)
    await User.findByIdAndUpdate(user._id, {token: token}, {new: true})
    if(user && token){
        res.status(201).json({token})
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
    
    if(user.token == ""){
        await User.findByIdAndUpdate(user._id, {token: generateToken(user._id)}, {new: true})
    }

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(202).json({token: user.token})
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Log out
// @route   POST /api/users/logout
// @acccess Public

const logoutUser = asyncHandler( async(req, res) =>{

    try{
        var token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findByIdAndUpdate(decoded.id, {token: ""}, {new: true})

        res.status(200).json({msg: "You sucessfully logged out"})
    }catch(error){
        res.status(400)
        throw new Error("Cant't logout")
    }
})

// @desc    View all books that are mine
// @route   GET /api/users/me
// @acccess Private

const myBooks = asyncHandler(async (req, res) =>{
    
    const own = await Book.find({owner: req.user.id})
    const lended = await Lending.find({reciver: req.user.id})

    res.status(200).json({own,lended})
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'})
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    myBooks
}