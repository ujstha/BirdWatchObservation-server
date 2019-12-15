const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");

// File Upload method
const s3 = new aws.S3({
  accessKeyId: "AKIA4PNLYW26VI46AH4E",
  secretAccessKey: "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",
  Bucket: "birdwatchobservation-uploads",
});

// Method for Single File Upload
const FileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "birdwatchobservation-uploads",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 2000000 }, // 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    CheckFileType(file, cb);
  },
}).single("speciesImage");

// Check file type
CheckFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Please Upload file with .jpeg, .jpg, .png extensions only.");
  }
};

module.exports = FileUpload;
