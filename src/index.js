const express = require('express')
require('./db/mongoose') // ensure that the file is running
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

    user.save()
        .then(() => {
            res.send(user)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

// Goal: Setup the task creation endpoint
//
// 1. Create a seperate file for the task model (load it into index.js)
// 2. Create the task creation end point (handle success and error)
// 3. Test the endipoint from postman with good and bad data 

app.post('/task')


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
