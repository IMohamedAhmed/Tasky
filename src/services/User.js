const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserService {
  async register(username, email, password) {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    }).save();

    const token = await this.generateUserToken(email, newUser._id);

    return token;
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
