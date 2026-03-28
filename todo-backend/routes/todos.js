const express = require("express");
const router = express.Router();
const { getTodos, addTodo, deleteTodo } = require("../controllers/todoController");

// Define routes
router.get("/", getTodos);         // GET /todos
router.post("/", addTodo);        // POST /todos
router.delete("/:id", deleteTodo); // DELETE /todos/:id

module.exports = router;