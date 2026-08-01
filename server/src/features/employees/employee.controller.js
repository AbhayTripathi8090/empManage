const employeeService = require('./employee.service');
const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/apiResponse');

/**
 * @desc    Create a new employee with profile image upload
 * @route   POST /api/v1/employees
 * @access  Private (Admin / Manager)
 */
const createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body, req.file);

  res.status(201).json(
    new ApiResponse(
      201,
      employee,
      'Employee record created successfully'
    )
  );
});

/**
 * @desc    Get all employees with pagination, search, & filtering
 * @route   GET /api/v1/employees
 * @access  Private
 */
const getEmployees = asyncHandler(async (req, res) => {
  const { page, limit, search, department, status, sortBy, sortOrder } = req.query;

  const result = await employeeService.getAllEmployees({
    page,
    limit,
    search,
    department,
    status,
    sortBy,
    sortOrder,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      result,
      'Employees list retrieved successfully'
    )
  );
});

/**
 * @desc    Get employee by ID
 * @route   GET /api/v1/employees/:id
 * @access  Private
 */
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      employee,
      'Employee details retrieved successfully'
    )
  );
});

/**
 * @desc    Update employee details & profile image
 * @route   PUT /api/v1/employees/:id
 * @access  Private (Admin / Manager)
 */
const updateEmployee = asyncHandler(async (req, res) => {
  const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body, req.file);

  res.status(200).json(
    new ApiResponse(
      200,
      updatedEmployee,
      'Employee record updated successfully'
    )
  );
});

/**
 * @desc    Delete employee by ID and remove image from Cloudinary
 * @route   DELETE /api/v1/employees/:id
 * @access  Private (Admin)
 */
const deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Employee record and associated image deleted successfully'
    )
  );
});

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
