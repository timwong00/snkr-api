const express = require("express");
const app = express();
const sneakerRoutes = require("./api/routes/sneakers");

app.use("/sneakers", sneakerRoutes);

app.use((req, res, next) => {
  res.status(200).json({
    message: "Server is successfully running and yes."
  });
});

module.exports = app;
