const express = require('express')
require('./db/mongoose') // ensure that the file is running
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
