const router = require("express").Router();
const User = require("../models/User.model");

router.post("/add-user", async (req, res) => {
  let { email, name, photo } = req.body;
  console.log(email, name, photo);
  if (!email || !name || !photo)
    return res.status(400).send({ msg: "Incorrect parameters" });

  let user = new User({
    email,
    name,
    photo,
  });

  try {
    let db_user = await User.find({ email: email });
    if (db_user === []) return res.status(400).send({ msg: "User exists" });
    await user.save();
  } catch (err) {
    return res.status(400).send({ msg: err });
  }

  return res.status(200).send({ msg: "Saved user" });
});

module.exports = router;
