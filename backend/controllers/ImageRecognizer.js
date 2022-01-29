const Clarifai = require("clarifai");

const imageRecognizer = async (url) => {
  const appClarifai = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY,
  });

  appClarifai.models
    .predict("food-item-recognition", url)
    .then((data) => {
      console.log(data.rawData.outputs[0].data.concepts);
      return data.rawData.outputs[0].data.concepts;
    })
    .catch((err) => res.status(400).json("unable to work api"));
};
module.exports = imageRecognizer;
