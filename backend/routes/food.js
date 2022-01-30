const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

router.post("/add-food", async (req, res) => {
  let { name, cals, carbs, prots, fats, fibers, url, food_type, email } =
    req.body;

  console.log(req.body);

  if (
    !name ||
    !cals ||
    !carbs ||
    !prots ||
    !fats ||
    !fibers ||
    !url ||
    !email ||
    !food_type
  )
    return res.status(400).send({ msg: "Wrong parameters" });

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }

  let date = convertDate(new Date());

  let tempObj = {
    id: new mongoose.Types.ObjectId(),
    name,
    calories: cals,
    carbohydrates: carbs,
    protein: prots,
    fat: fats,
    fiber: fibers,
    photo: url,
    date,
  };

  let mod_string = `foods.${food_type}`;

  try {
    let result = await User.updateOne(
      { email },
      {
        $push: { [mod_string]: tempObj },
      }
    );
    return res.status(200).send({ msg: result });
  } catch (err) {
    return res.status(400).send({ err: err });
  }
});

router.post("/get-food", async (req, res) => {
  let email = req.body.email;
  if (!email) return res.status(400).send({ msg: "Invalid params" });

  let user = await User.findOne({ email });
  console.log(user);
  return res.status(200).send({ foods: user.foods });
});

module.exports = router;
