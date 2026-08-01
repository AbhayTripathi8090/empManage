const express = require('express');
const router = express.Router();

const authRoutes = require('../features/auth/auth.routes');
const employeeRoutes = require('../features/employees/employee.routes');

// System Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Employee Management API Server is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Feature API Routes
router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
