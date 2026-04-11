const express = require("express");
const router = express.Router();
const { getTodos, addTodo, deleteTodo, toggleTodo } = require("../controllers/todoControllers");

// Define routes
router.get("/", getTodos);         // GET /todos
router.post("/", addTodo);        // POST /todos
router.delete("/:id", deleteTodo); // DELETE /todos/:id
router.patch("/:id", toggleTodo); // PATCH /todos/:id
module.exports = router;