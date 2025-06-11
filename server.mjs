// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from './db/conn.mjs';
import nutritionRoutes from './routes/nutritionRoutes.mjs';
//import Nutrition from './models/nutritionSchema.mjs';
import userRoutes from './routes/userRoutes.mjs'

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
connectDB();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/user', userRoutes)
// ErrMiddleware
app.use((err, _req, res, next) => {
  res.status(500).json({ msg: err.message });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});