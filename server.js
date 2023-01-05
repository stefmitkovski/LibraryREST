const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const port = process.env.PORT || 3000
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use('/api/books', require('./routes/bookRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on poer ${port}`))