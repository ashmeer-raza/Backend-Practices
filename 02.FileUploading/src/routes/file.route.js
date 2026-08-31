const express = require("express");
const upload = require("../config/multer");

const router = express.Router();

//There are we used middleware for accepting data
router.post("/", upload.single("image"), (req, res) => {
  //uploads have multiple files we can use upload.array("image") and if we have multiple fields we can use upload.fields([{name : "image" , maxCount : 1} , {name : "video" , maxCount : 1}])
  try {
    let body = req.body;
    let file = req.file;

    console.log(body);
    console.log(file);

    res.status(200).json({
      message: "File Recieved",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Inter Serever Error",
    });
  }
});

module.exports = router;
