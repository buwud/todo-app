const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('test sayfali router')
})

router.post('/users', async (req, res) => { //create user
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

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token //esitse tokenler o tokeni kaldiriyor
        })
        await req.user.save()
        //console.log(user)
        res.send()

    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


//only runs if authenticated
router.get('/users/me', auth, async (req, res) => { // get user profile
    res.send(req.user);
});

const multer = require('multer')
const upload = multer({
    dest: 'avatars', //destination
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', upload.single('avatar'), async (req, res) => {
    res.send()
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
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) //array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const id = req.params.id
        // const user = await User.findByIdAndDelete(id)

        // if (!user)
        //     return res.status(404).send()
        await req.user.deleteOne()
        console.log(req.user)
        res.send(req.user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router