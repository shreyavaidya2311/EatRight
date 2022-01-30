const router = require("express").Router();
const cloudinary = require("cloudinary");
const imageRecognizer = require("../controllers/ImageRecognizer.js");
// we will upload image on cloudinary
cloudinary.config({
  cloud_name: "dyt4b3so9",
  api_key: "384554139957286",
  api_secret: "nK3JCEcr8v5b2R_t-KmrJ5697PQ",
  secure: true,
});
const User = require("../models/User.model");
const Goal = require("../models/Goal.model");

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
              data = data.rawData.outputs[0].data.concepts;
              res.status(200).send({ data, url });
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
