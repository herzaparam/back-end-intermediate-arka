const connection = require('../config/db')

const user = {
  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getUserByToken: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE user_Id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          (
            reject(err)
          )
        }
      })
    })
  },
  register: (user) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', user,
        (err, result) => {
          if (!err) {
            connection.query("SELECT * FROM user WHERE email = ? ", user.email,
              (err, result) => {
                if (!err) {
                  resolve(result)
                } else {
                  reject(new Error("Internal server error"))
                }
              })
          } else {
            reject(new Error("Internal server error"))
          }
        })
    })
  },
  createUsersToken: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user_token SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error("Internal server error"));
        }
      });
    });
  },
  updateUser: (userId, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE user SET ? WHERE user_Id = ?', [data, userId], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE user_Id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  findToken: (token) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT token FROM user_token WHERE token = ?",
        token,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    });
  },
  deleteToken: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM user_token WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    });
  },
  setPassword: (password, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET password = ?, active = true WHERE email = ?`,
        [password, email],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    });
  },
  deleteEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM user WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    });
  },
  setActive: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET active = true WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    });
  }
}

module.exports = user
