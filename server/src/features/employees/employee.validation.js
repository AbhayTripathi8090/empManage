const { body, param, validationResult } = require('express-validator');
const ApiError = require('../../utils/apiError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    throw new ApiError(400, 'Employee Validation Error', formattedErrors);
  }
  next();
};

const createEmployeeValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  body('designation')
    .trim()
    .notEmpty()
    .withMessage('Designation is required'),
  body('salary')
    .notEmpty()
    .withMessage('Salary is required')
    .isNumeric()
    .withMessage('Salary must be a numeric value')
    .custom((val) => Number(val) >= 0)
    .withMessage('Salary cannot be negative'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim(),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(['Active', 'Inactive', 'On Leave'])
    .withMessage('Status must be Active, Inactive, or On Leave'),
  body('joiningDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Joining date must be a valid date'),
  validate,
];

const updateEmployeeValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid employee ID format'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('designation')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Designation cannot be empty'),
  body('salary')
    .optional()
    .isNumeric()
    .withMessage('Salary must be a numeric value')
    .custom((val) => Number(val) >= 0)
    .withMessage('Salary cannot be negative'),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(['Active', 'Inactive', 'On Leave'])
    .withMessage('Status must be Active, Inactive, or On Leave'),
  validate,
];

const mongoIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid employee ID format'),
  validate,
];

module.exports = {
  createEmployeeValidation,
  updateEmployeeValidation,
  mongoIdValidation,
};
