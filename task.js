const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Replace with your URI)
mongoose.connect('mongodb://localhost:27017/taskdb');

// Task Schema
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    dueDate: String
});

const Task = mongoose.model('Task', TaskSchema);

// Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
