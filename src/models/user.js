const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //trimming spaces before or after
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, //convert to lowercase before saving
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            //cant enter negative numbers
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new error('password cannot be taken like this, change it')
            }
        }
    }
})

//pre-before an event, before users are saved
//next-it says the process is done
userSchema.pre('save', async function (next) {
    const user = this

    //console.log('just before saving!')
    //hash the password

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User