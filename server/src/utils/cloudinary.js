const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const ApiError = require('./apiError');

/**
 * Upload a local file to Cloudinary and delete the local temp file.
 */
const uploadToCloudinary = async (localFilePath, folder = 'employee_management/profiles') => {
  if (!localFilePath) return null;

  try {
    // Check if Cloudinary credentials are set
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name';

    if (!isCloudinaryConfigured) {
      // Local development fallback if Cloudinary credentials are not configured yet
      const normalizedPath = localFilePath.replace(/\\/g, '/');
      const filename = localFilePath.split(/[\/\\]/).pop();
      return {
        url: `/${normalizedPath}`,
        publicId: `local_temp_${filename}`,
      };
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: 'image',
    });

    // Delete local temporary file after successful Cloudinary upload
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }

    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    // Remove local file if upload failed
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath).catch(() => {});
    }
    throw new ApiError(500, `Failed to upload image to Cloudinary: ${error.message}`);
  }
};

/**
 * Delete an image asset from Cloudinary using publicId.
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('local_temp_')) return null;

  try {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name';

    if (!isCloudinaryConfigured) return null;

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(`[Cloudinary Warning] Failed to delete publicId '${publicId}': ${error.message}`);
    return null;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};
