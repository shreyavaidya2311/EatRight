const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    duration_type: {
      type: String,
      required: true,
    },
    activity_type: {
      type: String,
      required: true,
    },
    final_goal: {
      type: Number,
      required: true,
    },
    current_amount: {
      type: Number,
      default: 0,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("goals", GoalSchema);
