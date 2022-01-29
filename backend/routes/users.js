const router = require("express").Router();
const User = require("../models/User.model");

router.post("/add-user", async (req, res) => {
  let { email, name, photo } = req.body;
  let user = new User({
    email,
    name,
    photo,
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(400).send({ msg: err });
  }

  return res.status(200).send({ msg: "Saved user" });
});

module.exports = router;
