const Employee = require('./employee.model');
const ApiError = require('../../utils/apiError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinary');

class EmployeeService {
  /**
   * Create a new employee with Cloudinary profile image upload
   */
  async createEmployee(employeeData, file) {
    // Check email uniqueness only if email is provided and non-empty
    if (employeeData.email && typeof employeeData.email === 'string' && employeeData.email.trim() !== '') {
      employeeData.email = employeeData.email.trim().toLowerCase();
      const existingEmployee = await Employee.findOne({ email: employeeData.email });
      if (existingEmployee) {
        throw new ApiError(400, 'An employee with this email address already exists.');
      }
    } else {
      delete employeeData.email;
    }

    // Upload profile image to Cloudinary if file is attached
    if (file) {
      const uploadResult = await uploadToCloudinary(file.path);
      if (uploadResult) {
        employeeData.profileImage = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
        };
      }
    }

    const employee = await Employee.create(employeeData);
    return employee;
  }

  /**
   * Get all employees with pagination, search, and status filtering
   */
  async getAllEmployees({
    page = 1,
    limit = 10,
    search = '',
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Construct filter criteria
    const filter = {};

    // Search filter (firstName, lastName, email, designation)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { designation: searchRegex },
      ];
    }

    // Status filter
    if (status && status.trim() !== '') {
      filter.status = status;
    }

    // Execute paginated queries
    const [employees, totalCount] = await Promise.all([
      Employee.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Employee.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limitNum) || 1;

    return {
      employees,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  /**
   * Get employee by ID
   */
  async getEmployeeById(employeeId) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new ApiError(404, `Employee with ID ${employeeId} not found.`);
    }
    return employee;
  }

  /**
   * Update employee details & replace old image on Cloudinary
   */
  async updateEmployee(employeeId, updateData, file) {
    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      throw new ApiError(404, `Employee with ID ${employeeId} not found.`);
    }

    // Verify email uniqueness if email is changing
    if (updateData.email && typeof updateData.email === 'string' && updateData.email.trim() !== '') {
      updateData.email = updateData.email.trim().toLowerCase();
      const duplicateEmployee = await Employee.findOne({
        email: updateData.email,
        _id: { $ne: employeeId },
      });
      if (duplicateEmployee) {
        throw new ApiError(400, 'Another employee with this email address already exists.');
      }
    } else {
      delete updateData.email;
    }

    // Handle new profile image upload and old Cloudinary image deletion
    if (file) {
      if (existingEmployee.profileImage?.publicId) {
        await deleteFromCloudinary(existingEmployee.profileImage.publicId);
      }

      const uploadResult = await uploadToCloudinary(file.path);
      if (uploadResult) {
        updateData.profileImage = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
        };
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return updatedEmployee;
  }

  /**
   * Delete employee by ID & delete associated image from Cloudinary
   */
  async deleteEmployee(employeeId) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new ApiError(404, `Employee with ID ${employeeId} not found.`);
    }

    if (employee.profileImage?.publicId) {
      await deleteFromCloudinary(employee.profileImage.publicId);
    }

    await Employee.findByIdAndDelete(employeeId);
    return { id: employeeId, deleted: true };
  }
}

module.exports = new EmployeeService();
