const router = require("express").Router();
const User = require("../models/User.model");
const Reward = require("../models/Reward.model");

router.get("/get-ranks", async (req, res) => {
  let result = await User.find();

  let tempArr = [];
  result.forEach((elem) =>
    tempArr.push({ name: elem.name, points: elem.points, email: elem.email })
  );

  tempArr.sort((a, b) =>
    a.points < b.points ? 1 : b.points < a.points ? -1 : 0
  );

  return res.status(200).send({ ranks: tempArr });
});

router.post("/add-reward", async (req, res) => {
  let { duration_type, activity_type, points, email } = req.body;

  if (!duration_type || !activity_type || !points || !email)
    return res.status(401).send({ msg: "Incorrect parameters" });

  let goal = new Reward({
    duration_type,
    activity_type,
    points,
  });

  let obj = await goal.save();
  console.log(obj._doc._id);
  let result;
  try {
    result = await User.updateOne(
      { email: email },
      { $push: { rewards: obj._doc._id }, $inc: { points: points } }
    );
  } catch (err) {
    return res.status(400).send({ msg: "Query failed" });
  }

  return res.status(200).send({ msg: obj });
});

module.exports = router;
