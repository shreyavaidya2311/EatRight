const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DailyEntry = require("./DailyEntry.model");
const Goal = require("./Goal.model");
const Reward = require("./Reward.model");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    diary: {
      type: [Schema.ObjectId],
      default: [],
    },
    goals: {
      type: [Schema.ObjectId],
      default: [],
    },
    rewards: {
      type: [Schema.ObjectId],
      default: [],
    },
    gFitID: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    foods: {
      default: [],
    },
  },
  { strict: false }
);

module.exports = mongoose.model("users", userSchema);
