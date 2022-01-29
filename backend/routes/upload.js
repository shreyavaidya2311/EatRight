const router = require("express").Router();
const cloudinary = require("cloudinary");
const imageRecognizer = require("../controllers/ImageRecognizer.js");
// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
router.post("/upload", async (req, res) => {
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
          const url = result.secure_url;
          let data = [];
          const appClarifai = new Clarifai.App({
            apiKey: process.env.CLARIFAI_KEY,
          });

          appClarifai.models
            .predict("food-item-recognition", url)
            .then((data) => {
              console.log(data.rawData.outputs[0].data.concepts);
              data = data.rawData.outputs[0].data.concepts;
              console.log(data);
              res.status(200).send(data);
            })
            .catch((err) => res.status(400).json("unable to work api"));
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
