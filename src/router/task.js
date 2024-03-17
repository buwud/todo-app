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
//all tasks /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {

    const match = {}

    if (req.query.status) {
        match.status = req.query.status === 'true' //convert boolean
    }

    try {
        //const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match: {
                status: false
            }
        })
        res.send(req.user.tasks)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
//user tasks by id
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const id = req.params.id
    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        //const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update]) //dynamic
        await task.save()
        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task)
            return res.status(404).send()
        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router