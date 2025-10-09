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

  loginOAuth: asyncHandler(async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Firebase token is required",
        success: false,
        data: null,
      });
    }

    const { email, name } = await UserService.decodedOAuthToken(token);

    let user = await UserService.findUserByEmail(email)

    if (user) {
      if (user.password) {
        return res.status(409).json({
          message: "This Account already exists",
          success: false,
        });
      }
    } else {
      user = await UserService.createUser(name, email)
    }

    const jwtToken = await UserService.generateUserToken(user.email, user._id)

    return res.status(200).json({
      message: "OAuth login successful",
      success: true,
      data: jwtToken,
    });
  }),

  sendresetPasswordOtp: asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return res.status(406).json({
        message: "Please Provide Valid Data",
        success: false,
      });
    }

    const user = await UserService.findUserByEmail(email)

    if (!user) return res.status(409).json({ message: "This Account doesn't exist", success: false });

    await UserService.sendOtp(email)

    return res.status(201).json({ message: "OTP sent", success: true });
  }),

  resetPassword: asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(406).json({
        message: "The confirmation password does not match.",
        success: false,
      });
    }

    await UserService.resetPassword(email, password)

    return res.status(201).json({ message: "Password updated", success: true });
  }),

  verifyOtp: asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;

    await UserService.verifyOtp(email, otp);

    return res.status(200).json({
      message: "OTP is Valid",
      success: true,
      data: "",
    });
  }),

  completeRegistration: asyncHandler(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res.status(406).json({
        message: "Please Provide Valid Data",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(406).json({
        message: "The confirmation password does not match.",
        success: false,
      });
    }
    const token = await UserService.completeRegistration(username, email, password);

    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
      data: token,
    });
  }),

  register: asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return res.status(406).json({
        message: "Please Provide Valid Data",
        success: false,
      });
    }

    const user = await UserService.findUserByEmail(email)

    if (user) return res.status(409).json({ message: "This Account already exists", success: false });

    await UserService.sendOtp(email)

    return res.status(201).json({ message: "OTP sent", success: true });
  }),

  getUserById: asyncHandler(async (req, res, next) => {
    const user = await UserService.getUserById(req.user._id);

    return res.status(200).json({
      message: "User retrieved successfully.",
      success: true,
      data: user,
    });
  }),
};
