// Imports
import express from 'express';
import dotenv from 'dotenv';

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
// Routes

// ErrMiddleware
app.use((err, _req, res, next) => {
  res.status(500).json({ msg: err.message });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});