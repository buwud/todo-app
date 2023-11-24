const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'todo-app-api'

mongoose.connect(`${connectionURL}/${dbName}`, {
    useNewUrlParser: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const gumus = new User({
    name: 'Ahmet Kaan Gumus',
    age: 21
})

gumus.save()
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })