require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { connect } = require('../src/middleware/index')
const app = express();

const Port = process.env.PORT;

connect(app)

mongoose.connect(process.env.TASKY_CONN_STR).then(() => {
  app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`);
  });
});