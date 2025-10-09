const { Schema, model } = require("mongoose");

const UserOtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpEntered: {
      type: Boolean,
      required: true,
      default: false
    },
    trials: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("UserOtp", UserOtpSchema, "UserOtps");
