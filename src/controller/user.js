const { v4: uuidv4 } = require('uuid')
const userModel = require('../model/user')
const helpers = require('../helper/printHelper')
const bcrypt = require('bcryptjs')
const common = require('../helper/common')
const jwt = require('jsonwebtoken')
const mail = require('../helper/sendEmail')
const { NotExtended } = require('http-errors')
const path = require("path");
const fs = require("fs");

exports.getUserByToken = (req, res) => {
  const email = req.email
  userModel.getUserByToken(email)
    .then((result) => {
      const user = result[0]
      delete user.password
      res.json({
        user: user
      })
    }).catch((err) => {
      console.log(err)
    })
}

exports.getUserById = (req, res) => {
  const id = req.params.iduser
  userModel.getUserById(id)
    .then((result) => {
      const user = result[0]
      delete user.password
      res.json({
        user: user
      })
    }).catch((err) => {
      console.log(err)
    })
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userModel.findUser(email)
    if (result.length === 0) {
      return helpers.printError(res, 401, 'wrong email and password combination!')
    }
    const user = result[0]
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return helpers.printError(res, 401, 'wrong password!')
    }
    delete user.password

    const payload = { userID: user.user_Id, email: user.email, role: user.role }

    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
      console.log('jalan');
      user.token = token
      if (payload.role === 1) {
        return helpers.printSuccess(res, 200, 'you are login as admin', result)
      } else {
        return helpers.printSuccess(res, 200, 'you are login as user', result)
      }
    })
  } catch (error) {
    return helpers.printError(res, 500, 'internal server error')
  }
}

exports.register = async (req, res) => {
  let image;
  if (!req.file) {
    image = "image/default.png";
  } else {
    image = req.file.path;
  }

  const { email, password } = req.body
  let result = await userModel.findUser(email)
  if (result.length !== 0) {
    return helpers.printError(res, 409, "email already in use")
  }
  const user = {
    user_Id: uuidv4(),
    email,
    password: await common.hashPassword(password),
    fname: '',
    lname: '',
    phone_number: '',
    image,
    active: false,
    role: false
  };
  const resultInsert = await userModel.register(user)

  delete resultInsert[0].password
  delete resultInsert[0].active
  delete resultInsert[0].role

  const payload = {
    id: resultInsert[0].user_Id,
    fname: resultInsert[0].fname,
    lname: resultInsert[0].lname,
    email: resultInsert[0].email,
    phone_number: resultInsert[0].phone_number,
    image: resultInsert[0].image
  }

  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" }, async (err, token) => {
    const data = {
      email: resultInsert[0].email,
      token: token,
    };
    await userModel.createUsersToken(data);
    await mail.send(resultInsert[0].email, token, "verify");
    helpers.printSuccess(
      res,
      200,
      "Your account has been created, please check your email to activate your account",
      resultInsert
    );
  });

}
exports.sendEmail = async (req, res) => {
  const email = req.body.email
  const resEmail = await helperEmail.sendEmail(email)

  return helpers.response(res, null, 200, null)
}

exports.updateUser = async (req, res) => {
  const userId = req.userID
  const { fname, lname, email, phone_number, image } = req.body

  const data = {
    fname,
    lname,
    email,
    phone_number,
    image
  }

  userModel
    .getUserById(userId)
    .then((result) => {
      let image;
      if (!req.file) {
        image = result[0].image;
      } else {
        const oldImage = result[0].image;
        if (oldImage !== "image/default.png") {
          removeImage(oldImage);
        }
        image = req.file.path;
      }
      data.image = image;
      console.log(req.file);
      console.log(data.image);
      return userModel.updateUser(userId, data);
    })
    .then((result) => {
      helpers.printSuccess(res, 200, "Users has been updated", result);
    })
    .catch((err) => {
      if (err.message === "Internal server error") {
        helpers.printError(res, 500, err.message);
      }
      helpers.printError(res, 400, err.message);
    });

}

exports.deleteUser = (req, res) => {
  const userId = req.params.id
  userModel.deleteUser(userId)
    .then((result) => {
      res.json({
        deletedUser: result
      })
    }).catch((err) => {
      return helpers.printError(res, 500, 'Internal server error')
    })
}

exports.forgotPassword = (req, res) => {

  const email = req.body.email;

  userModel
    .findUser(email)
    .then((result) => {
      delete result[0].password;
      delete result[0].active;
      const payload = {
        id: result[0].user_Id,
        fname: result[0].fname,
        lname: result[0].lname,
        email: result[0].email,
        phoneNumber: result[0].phone_number,
        image: result[0].image,
        role: result[0].role,
      };
      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" }, async (err, token) => {
        const data = {
          email: result[0].email,
          token: token,
        };
        await userModel.createUsersToken(data);
        await mail.send(result[0].email, token, "forgot");
        helpers.printSuccess(
          res,
          200,
          "Please check your email to reset your password!",
          result
        );
      });
    })
    .catch((err) => {
      helpers.printError(res, 500, err.message);
    });
};

exports.resetPassword = async (req, res) => {
  const email = req.query.email;
  const token = req.query.token;
  const password = req.body.password;

  try {
    const user = await userModel.findUser(email);
    if (user < 1) {
      helpers.printError(res, 400, "Reset password failed! Wrong email.");
      return;
    } else {
      try {
        const userToken = await userModel.findToken(token);
        if (userToken < 1) {
          helpers.printError(res, 400, "Reset password failed! Wrong token.");
          return;
        } else {
          jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
              if (err.name === "JsonWebTokenError") {
                helpers.printError(res, 401, "Invalid signature");
              } else if (err.name === "TokenExpiredError") {
                await userModel.deleteToken(email);
                helpers.printError(res, 401, "Token is expired");
              } else {
                helpers.printError(res, 401, "Token is not active");
              }
            } else {
              const data = await common.hashPassword(password);
              await userModel.setPassword(data, email);
              await userModel.deleteToken(email);
              if (!data) {
                helpers.printError(res, 400, "Content cannot be empty");
                return;
              }
              helpers.printSuccess(
                res,
                200,
                "Password has been changed! Please login.",
                decoded
              );
            }
          });
        }
      } catch (err) {
        helpers.printError(res, 500, err.message);
      }
    }
  } catch (err) {
    helpers.printError(res, 500, err.message);
  }
};

exports.verify = async (req, res) => {
  const email = req.query.email;
  const token = req.query.token;

  try {
    const user = await userModel.findUser(email);
    if (user < 1) {
      helpers.printError(res, 400, "Email is not valid!");
      return;
    } else {
      try {
        const userToken = await userModel.findToken(token);
        if (userToken < 1) {
          helpers.printError(res, 400, "Token is not valid!");
          return;
        } else {
          jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
              if (err.name === "JsonWebTokenError") {
                helpers.printError(res, 401, "Invalid signature");
              } else if (err.name === "TokenExpiredError") {
                await userModel.deleteEmail(email);
                await userModel.deleteToken(email);
                helpers.printError(res, 401, "Token is expired");
              } else {
                helpers.printError(res, 401, "Token is not active");
              }
            } else {
              await userModel.setActive(email);
              await userModel.deleteToken(email);
              helpers.printSuccess(
                res,
                200,
                `${email} has been activated, please login!`,
                decoded
              );
            }
          });
        }
      } catch (err) {
        helpers.printError(res, 500, err.message);
      }
    }
  } catch (err) {
    helpers.printError(res, 500, err.message);
  }
};
const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => new Error(err));
};