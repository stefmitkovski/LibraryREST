const mongoose = require('mongoose')

const lendingSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Lending',lendingSchema)