const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => { //create task
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (error) {
        res.status(500).send(error)
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
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

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