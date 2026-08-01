const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary cannot be negative'],
    },
    // Optional Fields
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows multiple records without email
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive', 'On Leave'],
        message: 'Status must be Active, Inactive, or On Leave',
      },
      default: 'Active',
    },
    profileImage: {
      url: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index & field indexes for fast search and filter performance
employeeSchema.index({ firstName: 'text', lastName: 'text', email: 'text', designation: 'text' });
employeeSchema.index({ status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);
