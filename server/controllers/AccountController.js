const { Op } = require("sequelize");
const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jsonWebToken");
const models = require("../models");
const account = models.account;
class AccountController {
  static async register(req, res) {
    try {
      let { username, name, email, password, confirmPassword } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      if (password === confirmPassword) {
        const checkUsername = await account.findOne({ where: { username } });
        const checkEmail = await account.findOne({
          where: { email },
        });
        if (checkUsername !== null) {
          res.status(400).json({
            status: false,
            message: "username not available",
          });
        } else if (checkEmail !== null) {
          res.status(400).json({
            status: false,
            message: "email is already registered",
          });
        } else {
          const result = await account.create({
            username,
            name,
            email,
            password: encryptPwd(password),
          });
          if (result !== null) {
            res.status(201).json({
              status: true,
              message: `${username} has been created!`,
              data: result,
            });
          } else {
            res.status(400).json({
              status: false,
              message: "account failed to created!",
            });
          }
        }
      } else {
        res.status(400).json({
          status: false,
          message: "password and confirm password not match!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async login(req, res) {
    try {
      const { key, password } = req.body;
      const result = await account.findOne({
        where: {
          [Op.or]: [
            { username: key.toLowerCase() },
            { email: key.toLowerCase() },
          ],
        },
      });
      if (result !== null) {
        if (decryptPwd(password, result.password)) {
          const access_token = tokenGenerator(result);
          res.status(202).json({
            status: true,
            message: "login successful",
            data: {
              id: result.id,
              username: result.username,
              name: result.name,
              access_token: access_token,
            },
          });
        } else {
          res.status(400).json({
            status: false,
            message: "invalid password!",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: `${key} was not registered!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}

module.exports = AccountController;
