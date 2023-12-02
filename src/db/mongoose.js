const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'todo-app-api'

mongoose.connect(`${connectionURL}/${dbName}`, {
    useNewUrlParser: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true //trimming spaces before or after
    },
    email: {
        type: String,
        require: true,
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
    }
})

const me = new User({
    name: 'Buse Duran',
    email: 'mikeDf@gmail.com'
})

me.save()
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })

//create new model for tasks

const Task = mongoose.model('Task', {
    name: {
        type: String
    },
    status: {
        type: Boolean
    }
})

// const taskForMe = new Task({
//     name: 'Clean desk',
//     status: false
// })

// taskForMe.save()
//     .then((result) => {
//         console.log('result')
//     })
//     .catch((error) => {
//         console.log(error)
//     })