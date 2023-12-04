const mongoose = require('mongoose')
//const validator = require('validator')

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    }
})
module.exports = Task