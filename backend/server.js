require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.send("this is foodlogger");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
