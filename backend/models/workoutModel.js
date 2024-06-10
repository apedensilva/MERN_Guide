const mongoose = require('mongoose')

//Schema Creation
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, { timestamps: true })

// Model Export to mongoose
module.exports = mongoose.model('Workout', workoutSchema)
