// Imports
const express = require("express");
const cors = require("cors");

// App configuration
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // lets us handle JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});