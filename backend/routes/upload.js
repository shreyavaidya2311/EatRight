const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
router.post("/upload", (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ mag: "No files were uploaded" });

    // its due to express file upload middleware
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTempFiles(file.tempFilePath);
      // file size>1 megabyte
      return res.status(400).json({ msg: "file is too large " });
    }
    if (
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png"
    ) {
      removeTempFiles(file.tempFilePath);
      return res.status(400).json({ msg: "file format is invalid " });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "EatRight",
      },
      async (err, result) => {
        if (err) throw err;

        removeTempFiles(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
// upload creates a temporary file, we must delete it
const removeTempFiles = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
