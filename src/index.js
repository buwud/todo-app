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

//basic hashing algorithm
const bcrypt = require('bcryptjs')
const myFunc = async () => {
    const password = 'B123.'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('b123.', hashedPassword)
    console.log(isMatch)
}
myFunc()