// Entry point for the backend server
require('dotenv').config();
console.log("Mongo URI loaded:", process.env.MONGO_URI ? "YES" : "NO");
const express = require('express');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const competitionRoutes = require('./src/routes/competitionRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/competitions', competitionRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
