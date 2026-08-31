const multer = require("multer");

// DiskStorage for Local Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //(error , data/destination)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// MemoryStorage for AWS S3 (server)
// const storage = multer.memoryStorage()

//Create a middlewar
const upload = multer({ storage }); // ({storage : storage}) if we have both (key , val) are same we can write like this

module.exports = upload;
