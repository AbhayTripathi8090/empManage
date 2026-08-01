const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('./employee.controller');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
  mongoIdValidation,
} = require('./employee.validation');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');

// All employee routes are protected
router.use(protect);

router
  .route('/')
  .get(getEmployees)
  .post(
    authorize('admin', 'manager'),
    upload.single('profileImage'),
    createEmployeeValidation,
    createEmployee
  );

router
  .route('/:id')
  .get(mongoIdValidation, getEmployeeById)
  .put(
    authorize('admin', 'manager'),
    upload.single('profileImage'),
    updateEmployeeValidation,
    updateEmployee
  )
  .delete(authorize('admin'), mongoIdValidation, deleteEmployee);

module.exports = router;
