// @desc    Register a user
// @route   POST /api/users/register
// @acccess Public

const registerUser = (req,res) =>{
    res.status(200).json({
        msg: "Register user"
    })
}

// @desc    Login in
// @route   POST /api/users/login
// @acccess Public

const loginUser = (req, res) =>{
    res.status(200).json({
        msg: "Login user"
    })
}

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