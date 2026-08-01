const authService = require('./auth.service');
const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/apiResponse');
const { getCookieOptions } = require('../../utils/jwt');

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);

  res.cookie('token', token, getCookieOptions());

  res.status(201).json(
    new ApiResponse(
      201,
      { user, token },
      'User registered successfully'
    )
  );
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);

  res.cookie('token', token, getCookieOptions());

  res.status(200).json(
    new ApiResponse(
      200,
      { user, token },
      'Logged in successfully'
    )
  );
});

/**
 * @desc    Logout user & clear cookie
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Logged out successfully'
    )
  );
});

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      user,
      'Current user profile retrieved successfully'
    )
  );
});

/**
 * @desc    Update user profile & avatar
 * @route   PUT /api/v1/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await authService.updateUserProfile(req.user._id, req.body, req.file);

  res.status(200).json(
    new ApiResponse(
      200,
      updatedUser,
      'Profile updated successfully'
    )
  );
});

/**
 * @desc    Change user password
 * @route   PUT /api/v1/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const result = await authService.changePassword(req.user._id, req.body);

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      result.message
    )
  );
});

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
};
