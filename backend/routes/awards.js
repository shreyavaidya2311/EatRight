const router = require("express").Router();
const User = require("../models/User.model");

router.get("/get-ranks", async (req, res) => {
  let result = await User.find();

  let tempArr = [];
  result.forEach((elem) =>
    tempArr.push({ name: elem.name, points: elem.points })
  );

  tempArr.sort((a, b) =>
    a.points < b.points ? 1 : b.points < a.points ? -1 : 0
  );

  return res.status(200).send({ ranks: tempArr });
});

module.exports = router;
