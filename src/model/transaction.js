const connection = require('../config/db')

const transaction = {
  getUserTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT name, COUNT(*) AS number_of_transaction FROM tickets INNER JOIN user ON user.user_Id = tickets.user_Id GROUP BY user.name', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getSortTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_Id, time_stamp FROM tickets ORDER BY time_stamp', (err, result) => {
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

  // insertTransaction: (history) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('INSERT INTO transaction SET ?', history, (err, result) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // },
  // updateTransaction: (id, history) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('UPDATE transaction SET ? WHERE transaction_Id = ?', [history, id], (err, result) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // },
  // deleteTransaction: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('DELETE FROM transaction WHERE transaction_Id = ?', id, (err, result) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // }
}

module.exports = transaction
