require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Routes
app.use("/api/todos", todoRoutes);

// Error handling (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
