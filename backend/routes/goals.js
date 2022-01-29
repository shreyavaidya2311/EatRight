const router = require("express").Router();
const Goal = require("../models/Goal.model");
const User = require("../models/User.model");

router.post("/add-goal", async (req, res) => {
  let { duration_type, activity_type, final_goal, email } = req.body;

  if (!duration_type || !activity_type || !final_goal || !email)
    return res.status(401).send({ msg: "Incorrect parameters" });

  let goal = new Goal({
    duration_type,
    activity_type,
    final_goal,
  });

  let obj = await goal.save();
  console.log(obj._doc._id);
  let result;
  try {
    result = await User.updateOne(
      { email: email },
      { $push: { goals: obj._doc._id } }
    );
  } catch (err) {
    return res.status(400).send({ msg: "Query failed" });
  }

  return res.status(200).send({ msg: obj });
});

module.exports = router;
