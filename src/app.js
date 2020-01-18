require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const morganOptions = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
});

module.exports = app;
