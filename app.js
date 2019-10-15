const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const sneakerRoutes = require("./api/routes/sneakers");
const collectionRoutes = require("./api/routes/collection");
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

app.use(morgan("dev"));

app.use("/sneakers", sneakerRoutes);
app.use("/collection", collectionRoutes);
app.use("/user", userRoutes);

// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

module.exports = app;
