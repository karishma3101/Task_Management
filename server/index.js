const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const User = require("./modals/Employee");
const Task = require("./modals/Task"); // Import Task schema

mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (password === user.password) {
                    res.json("success");
                } else {
                    res.json("password incorrect");
                }
            } else {
                res.json("user not found");
            }
        })
        .catch(err => {
            res.status(500).json("server error");
            console.error(err);
        });
});

// Registration endpoint
app.post("/register", (req, res) => {
    User.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});

// Task endpoints
// POST - Create a new task
app.post("/tasks", (req, res) => {
    const { taskName, description, genre, date } = req.body;
    const newTask = new Task({ taskName, description, genre, date });

    newTask.save()
        .then(task => res.json(task))
        .catch(err => res.status(500).json(err));
});

// GET - Retrieve all tasks
app.get("/tasks", (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json(err));
});

// DELETE - Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json("Task deleted"))
        .catch(err => res.status(500).json(err));
});

// PUT - Update a task by ID
app.put("/tasks/:id", (req, res) => {
    const { taskName, description, genre, date } = req.body;
    Task.findByIdAndUpdate(req.params.id, { taskName, description, genre, date }, { new: true })
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.status(500).json(err));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
