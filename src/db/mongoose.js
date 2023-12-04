const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'todo-app-api'

mongoose.connect(`${connectionURL}/${dbName}`, {
    useNewUrlParser: true
})
