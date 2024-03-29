const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', { //not exist in the db, it's virtual
    ref: 'Task',
    localField: '_id', //user id
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () { //do not expose important user values in user profile
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismyproject')
    return token
}

//user login validate
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user)
        throw new Error('Unable to login!')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
        throw new Error('Unable to login!')

    return user
}
//pre-before an event, before users are saved
//next-it says the process is done
userSchema.pre('save', async function (next) {
    const user = this
    //hash the password
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//delete user tasks when user is removed - CASCADE DELETE
userSchema.pre('remove', async function (next) {
    const user = this
    Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User