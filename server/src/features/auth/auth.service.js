const User = require('./auth.model');
const ApiError = require('../../utils/apiError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinary');

class AuthService {
  /**
   * Register a new user with default admin role
   */
  async registerUser({ name, email, password, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists.');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'admin', // Defaults to full admin control
    });

    const token = user.generateAuthToken();
    return { user: user.toJSON(), token };
  }

  /**
   * Authenticate user with email and password
   */
  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    const token = user.generateAuthToken();
    return { user: user.toJSON(), token };
  }

  /**
   * Fetch user by ID excluding sensitive data
   */
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }
    return user;
  }

  /**
   * Update user profile details and handle Cloudinary avatar upload
   */
  async updateUserProfile(userId, updateData, file) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    // Verify email uniqueness if email is changing
    if (updateData.email && updateData.email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({
        email: updateData.email.toLowerCase(),
        _id: { $ne: userId },
      });
      if (existingUser) {
        throw new ApiError(400, 'Email address is already in use by another account.');
      }
      user.email = updateData.email.toLowerCase();
    }

    if (updateData.name) {
      user.name = updateData.name;
    }

    // Handle profile avatar upload to Cloudinary
    if (file) {
      const uploadResult = await uploadToCloudinary(file.path, 'employee_management/avatars');
      if (uploadResult) {
        user.avatar = uploadResult.url;
      }
    }

    await user.save();
    return user;
  }

  /**
   * Change user password after verifying current password
   */
  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    const isPasswordMatched = await user.matchPassword(currentPassword);
    if (!isPasswordMatched) {
      throw new ApiError(400, 'Current password provided is incorrect.');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}

module.exports = new AuthService();
