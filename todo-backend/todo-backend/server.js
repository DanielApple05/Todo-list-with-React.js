const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
}); 

// Todo routes
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});