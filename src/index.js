const express = require('express')
require('./db/mongoose') // ensure that the file is running
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

const port = process.env.PORT || 3000

//middleware function
//without next, its stuck 
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const User = require('./models/user')
const Task = require('./models/task')

const main = async () => {
    const user = await User.findById('65ecc091caa5b086874b559c')
    await user.populate('tasks')
    console.log(user.tasks)

}
main()