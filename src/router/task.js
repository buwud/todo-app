const express = require('express')
const router = express.Router()
const Task = require('../models/task')


router.post('/tasks', async (req, res) => { //create task
    const task = new Task(req.body)
    console.log(req.body)

    try {
        await task.save()
        res.send(task)
    }
    catch (error) {
        res.status(201).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
router.get('/tasks/:id', async (req, res) => {
    const __id = req.params.id
    //656de6d5cb114a2e7d0e7f53

    try {
        const task = await Task.findById(__id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const id = req.params.id
    try {

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update]) //dynamic
        await task.save()

        //const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
router.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)

        if (!task)
            return res.status(404).send()
        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router