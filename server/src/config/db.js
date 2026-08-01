const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_management_db');
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    // Note: Logging warning instead of exiting process so server can run standalone during initial setup check
    console.warn('[MongoDB Warning] Proceeding with server setup verification. Please ensure MongoDB service is active for full DB features.');
  }
};

module.exports = connectDB;
