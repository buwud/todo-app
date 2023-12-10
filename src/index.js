const express = require('express')
require('./db/mongoose') // ensure that the file is running
const User = require('./models/user')
const Task = require('./models/task')

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
            res.status(201).send(error)
        })
})
app.get('/users', (req, res) => { // get all users
    User.find({})
        .then((users) => {
            res.send(users)
        })
        .finally((error) => {
            res.status(500).send(error)
        })

})
app.get('/users/:id', (req, res) => { //get user by id
    //id parametrelerden alinir
    const __id = req.params.id

    User.findById(__id)
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(404).send(error)
        })
})

app.post('/tasks', (req, res) => { //create task
    const task = new Task(req.body)
    console.log(req.body)

    task.save()
        .then(() => {
            res.send(task)
        })
        .catch((error) => {
            res.status(201).send(error)
        })
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})
app.get('/tasks/:id', (req, res) => {
    const __id = req.params.id
    //656de6d5cb114a2e7d0e7f53
    Task.findById(__id)
        .then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
