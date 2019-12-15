const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

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
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).single("speciesImage");

// Check file type
checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = FileUpload;
