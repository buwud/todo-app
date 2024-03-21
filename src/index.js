const express = require('express')
require('./db/mongoose') // ensure that the file is running
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

const port = process.env.PORT || 3000

//upload file
const multer = require('multer')
const upload = multer({
    dest: 'images' //destination
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const User = require('./models/user')
const Task = require('./models/task')

const main = async () => {
    const user = await User.findById('65f3414454bba735849fb80f')
    await user.populate('tasks')
    console.log(user.tasks)

}
main()