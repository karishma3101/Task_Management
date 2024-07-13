// modals/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    genre: String,
    date: Date
});

module.exports = mongoose.model('Task', taskSchema);
