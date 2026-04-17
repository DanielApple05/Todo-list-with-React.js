require('dotenv').config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
}); 

// Todo routes
app.use("/todos", todoRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});