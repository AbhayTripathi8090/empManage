const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a given user payload.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Get cookie options for storing JWT in HTTP-Only cookies.
 */
const getCookieOptions = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };
};

module.exports = { generateToken, getCookieOptions };
