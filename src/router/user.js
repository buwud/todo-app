const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('test sayfali router')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token })
        await user.save()
        res.send({ user, token })
    }
    catch (error) {
        res.status(400).send(error)
    }
})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        //save the token in db
        user.tokens = user.tokens.concat({ token })
        await user.save()

        res.send({ user, token }) //shorthand syntax to send both props
    }
    catch (error) {
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => { // get all users
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => { //get user by id
    //id parametrelerden alinir
    const __id = req.params.id

    try {
        const user = await User.findById(__id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (error) {
        res.status(404).send(error)
    }
})

//patch --> updating an existing resource
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) //array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const id = req.params.id
    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update]) //dynamic
        await user.save()

        //const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)

        if (!user)
            return res.status(404).send()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router