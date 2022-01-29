const router = require("express").Router();
const cloudinary = require("cloudinary");
// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
router.post("/upload", (req, res) => {
  try {
    if (req.body) {
      cloudinary.v2.uploader.upload(
        req.body.file,
        {
          folder: "EatRight",
        },
        async (err, result) => {
          if (err) throw err;
          console.log(result);
          res.send({ public_id: result.public_id, url: result.secure_url });
        }
      );
    }
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});
router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      return res.send({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
