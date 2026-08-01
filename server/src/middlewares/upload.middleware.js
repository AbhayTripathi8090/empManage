const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure temporary upload directory exists
const tempUploadDir = path.join(__dirname, '../../uploads/temp');
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Disk storage for temporary file buffering before Cloudinary upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempUploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter for JPG, JPEG, PNG, WEBP only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpg|jpeg|png|webp/;
  const allowedMimeTypes = /^image\/(jpeg|png|webp)$/;

  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, and WEBP image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
  fileFilter,
});

module.exports = upload;
