require('./src/db/mongoose')
const User = require('./src/models/user')
const Task = require('./src/models/task')


// User.findByIdAndUpdate('656ce0a3999ccaab20d0034a', { age: 22 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 22 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

//create deleteTaskandCount as an async function
// - accept id of task to remove
//use await to delete task and count up incomplete task
//return the count
//test your work

const deleteTaskandCount = async (id) => {
    const remove = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ status: false })
    return count
}

deleteTaskandCount('656de6bbcb114a2e7d0e7f51').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})