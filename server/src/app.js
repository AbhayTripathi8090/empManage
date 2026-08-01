const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount Central API Routes
app.use('/api/v1', apiRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Employee Management System API is running...');
});

// Global Error Middleware
app.use(errorHandler);

module.exports = app;
