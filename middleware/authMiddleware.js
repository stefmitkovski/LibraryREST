const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) =>{
    var token

    const hasToken = User.find

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        try{

            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            if(req.user.token == ""){
                res.status(401)
                throw new Error('Not authorize')    
            }

            next()
        }catch(error){
            res.status(401)
            throw new Error('Not authorize')
        }

    }
    if(!token){
        res.status(401)
        throw new Error('No authorize, no token')
    }
})

module.exports = { protect }