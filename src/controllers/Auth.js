const asyncHandler = require("../../Utils/asyncHandler");
const UserService = require("../services/Auth");

module.exports = {
  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).json({
        message: "Please Provide Valid Data",
        success: false,
        data: "",
      });
    }

    const token = await UserService.login(email, password);

    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      data: token,
    });
  }),

  register: asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(406).json({
        message: "Please Provide Valid Data",
        success: false,
      });
    }

    const token = await UserService.register(username, email, password);

    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
      data: token,
    });
  }),
};
