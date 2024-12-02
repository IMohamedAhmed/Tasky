require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const appRoutes = require("../src/routes/index");
const app = express();

app.use(express.json());
app.use("/api", appRoutes);

const Port = process.env.PORT;

mongoose.connect(process.env.TASKY_CONN_STR).then(() => {
  app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`);
  });
});
