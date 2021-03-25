const connection = require('../config/db')

const ticket = {
  getTicket: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT tickets.order_Id, user.name, movie_details.title, cinema_location.cinema, time_stamp, seat FROM tickets INNER JOIN user ON tickets.user_Id = user.user_Id INNER JOIN movie_details ON tickets.movie_Id = movie_details.movie_Id INNER JOIN cinema_location ON tickets.location_Id = cinema_location.location_Id ORDER BY ${sort} `, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getHistoryTicket: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT tickets.order_Id, user.fname, movie_details.title, cinema_location.cinema, time_stamp, seat FROM tickets INNER JOIN user ON tickets.user_Id = user.user_Id INNER JOIN movie_details ON tickets.movie_Id = movie_details.movie_Id INNER JOIN cinema_location ON tickets.location_Id = cinema_location.location_Id WHERE user.user_Id = ${id} `, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getTicketById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT tickets.order_Id, user.name, movie_details.title, cinema_location.cinema, time_stamp, seat FROM tickets INNER JOIN user ON tickets.user_Id = user.user_Id INNER JOIN movie_details ON tickets.movie_Id = movie_details.movie_Id INNER JOIN cinema_location ON tickets.location_Id = cinema_location.location_Id WHERE title LIKE "%"?"%"', id, (err, result) => {
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
  insertTicket: (tick) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tickets SET ?', tick, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateTicket: (id, ticket) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE tickets SET ? WHERE order_Id = ?', [ticket, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteTicket: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM tickets WHERE order_Id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = ticket
