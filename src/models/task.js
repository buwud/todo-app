const mongoose = require('mongoose')
//const validator = require('validator')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

//pre-before an event, before users are saved
//next-it says the process is done
taskSchema.pre('save', async function (next) {
    const task = this

    //console.log('just before saving!')
    //hash the password

    if (task.isModified('password')) {
        user.password = await bcrypt.hash(task.password, 8)
    }

    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task