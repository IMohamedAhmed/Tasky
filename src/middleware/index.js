const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require('../../Utils/asyncHandler')
const appRoutes = require("../../src/routes/index");
const express = require("express");
const { expressjwt } = require('express-jwt');
const constants = require('../../constants/index')
const bodyParser = require('body-parser');

module.exports = {
  connect(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      expressjwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256']
      }).unless(constants.ALLOWED_ROUTES)
    );

    app.use(asyncHandler(async (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader?.split(" ")[1];

      if (token) {
        const { userId } = jwt.verify(token, process.env.SECRET_KEY, { algorithm: "HS256" });
        const user = await User.findById(userId, { username: 1, email: 1, status: 1 });

        if (!user) {
          res.status(404).json({ message: "User Not Found", success: false });
        }

        if (user.status !== "Active") {
          res.status(401).json({ message: "Unauthorized access.", success: false });
        }

        req.user = user;
      }
      return next()
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", appRoutes);

    app.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized access.', success: false })
      }
      next();
    });
  },
};
