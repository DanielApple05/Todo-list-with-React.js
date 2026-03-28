const todos = require("../data/todos");

// GET all todos
const getTodos = (req, res) => {
  res.json(todos);
};

// POST (add) a todo
const addTodo = (req, res) => {
  const newTodo = {
    id: Date.now(),       // simple unique ID
    text: req.body.text,  // from request body
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// DELETE a todo
const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

module.exports = { getTodos, addTodo, deleteTodo } ; 