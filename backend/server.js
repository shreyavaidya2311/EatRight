require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));
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
app.use("/api", require("./routes/upload.js"));
app.use("/api/users", require("./routes/users"));
app.use("/api/awards", require("./routes/awards"));
app.use("/api/goals", require("./routes/goals"));

app.get("/", (req, res) => {
  res.send("this is foodlogger");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
