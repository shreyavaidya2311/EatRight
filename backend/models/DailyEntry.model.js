const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Food = require("./Food.model");

const DailyEntrySchema = new Schema(
  {
    date: {
      type: Date,
      default: new Date().toLocaleDateString(),
    },
    foods: {
      type: [Schema.ObjectId],
      required: true,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("daily_entries", DailyEntrySchema);
