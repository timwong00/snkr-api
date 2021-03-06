const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const sneakerRoutes = require("./api/routes/sneakers");
const portfolioRoutes = require("./api/routes/portfolio");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGO_ATLAS_USER +
    ":" +
    process.env.MONGO_ATLAS_PW +
    "@snkr-api-zgjbw.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/sneakers", sneakerRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
