const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema(
  {
    duration_type: {
      type: String,
      required: true,
    },
    activity_type: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("rewards", RewardSchema);
