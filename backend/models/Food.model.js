const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    meal_type: {
      type: String,
      required: true,
    },
    nutrition: {
      type: Map,
      of: Number,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("foods", FoodSchema);
