const Todo = require("../models/Todo");

// GET all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// CREATE todo
const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE todo
const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE todo
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
};