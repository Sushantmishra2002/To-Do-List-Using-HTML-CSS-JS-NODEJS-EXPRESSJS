const express = require('express');
const router = express.Router();

let todos = [];

// Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Add a new todo
router.post('/add', (req, res) => {
    const { task } = req.body;
    if (task) {
        todos.push({ task, completed: false });
    }
    res.redirect('/');
});

// Delete a todo
router.post('/delete', (req, res) => {
    const { taskIndex } = req.body;
    todos.splice(taskIndex, 1);
    res.redirect('/');
});

// Update todo completion status
router.post('/complete', (req, res) => {
    const { taskIndex } = req.body;
    if (todos[taskIndex]) {
        todos[taskIndex].completed = !todos[taskIndex].completed;
    }
    res.redirect('/');
});

module.exports = router;
