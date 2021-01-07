const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

const apiRoutes = require("./routes/api");
const indexRoutes = require("./routes/index");

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// process.env.MONGODBURL = "mongodb://localhost:27017/workout";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});