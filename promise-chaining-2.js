require('./src/db/mongoose')
const User = require('./src/models/user')

User.findByIdAndUpdate('656ce0a3999ccaab20d0034a', { age: 22 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 22 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
