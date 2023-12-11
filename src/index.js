const express = require('express')
require('./db/mongoose') // ensure that the file is running
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => { // get all users
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/users/:id', async (req, res) => { //get user by id
    //id parametrelerden alinir
    const __id = req.params.id

    try {
        const user = await user.findById(__id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (error) {
        res.status(404).send(error)
    }
})

app.post('/tasks', async (req, res) => { //create task
    const task = new Task(req.body)
    console.log(req.body)

    try {
        await task.save()
        res.send(task)
    }
    catch (error) {
        res.status(201).send(error)
    }

    // task.save()
    //     .then(() => {
    //         res.send(task)
    //     })
    //     .catch((error) => {
    //         res.status(201).send(error)
    //     })
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
