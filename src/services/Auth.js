const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserOtp = require("../models/UserOtp");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin")
const nodemailer = require("nodemailer")
const crypto = require('crypto');
const { generateOTPEmailHTML } = require('../../Utils/emailTemplates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PROJECTS_EMAIL_SERVICE,
    pass: process.env.PROJECTS_EMAIL_SERVICE_PASSWORD
  }
});

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

class UserService {
  async sendOtp(email) {
    const otp = crypto.randomInt(1000, 10000).toString();
    const hashOtp = await bcrypt.hash(otp, 12);
    const otpDoc = await UserOtp.findOne({ email, otpEntered: false }, { trials: 1 })

    if (!otpDoc) await UserOtp({ otp: hashOtp, email }).save();
    if (otpDoc && otpDoc.trials >= 3) return Promise.reject("User Blocked For 10 minutes.")
    if (otpDoc) await UserOtp.updateOne({ _id: otpDoc._id }, { $inc: { trials: 1 }, $set: { otp: hashOtp } });

    const mailOptions = {
      from: process.env.PROJECTS_EMAIL_SERVICE,
      to: email,
      subject: "Verify Your Email - Tasky",
      text: `Your verification code is: ${otp}\nThis code will expire in 10 minutes.`,
      html: generateOTPEmailHTML(otp),
    };

    transporter.sendMail(mailOptions).catch(err => new Error(err))

    return;
  }

  async verifyOtp(email, otp) {
    const otpDoc = await UserOtp.findOne({ email, otpEntered: false }, { otp: 1 })
    const isValidOtp = await bcrypt.compare(otp, otpDoc.otp)

    if (!isValidOtp) throw Error("Wrong Or Invalid Otp");

    return
  }

  async completeRegistration(username, email, password) {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    }).save();

    const token = await this.generateUserToken(email, newUser._id);

    return token;
  }

  async resetPassword(email, password) {
    const hashPassword = await bcrypt.hash(password, 12);

    return User.updateOne({ email }, { $set: { password: hashPassword } })
  }

  async getUserById(userId) {
    return User.findOne({ _id: userId });
  }

  async createUser(username, email, password = null) {
    return new User({ username, email, password }).save();
  }

  async findUserByEmail(email) {
    return User.findOne({ email });
  }

  async decodedOAuthToken(token) {
    return admin.auth().verifyIdToken(token);
  }

  async login(email, password) {
    const user = await User.findOne({ email: email }).lean();

    if (!user) {
      throw Error("User Not Found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw Error("Wrong Or Invalid Password");
    }

    const token = await this.generateUserToken(user.email, user._id);

    return token;
  }

  async generateUserToken(email, userId) {
    const token = jwt.sign({ email, userId }, process.env.SECRET_KEY, {
      expiresIn: "365d",
      algorithm: "HS256",
    });

    return Promise.resolve(token);
  }
}

module.exports = new UserService();
