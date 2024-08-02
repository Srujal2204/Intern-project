const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: { 
        type: String 
    }

});

const TaskModel = mongoose.model('todos', TaskSchema)
module.exports = TaskModel;
