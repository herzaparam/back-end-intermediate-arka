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
  getUserTicket: (userID) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT *, cinemas.image FROM tickets INNER JOIN cinemas ON tickets.cinemasID = cinemas.id WHERE userID = ?`, userID, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getSchedule: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tickets where movieID = ? AND cinemasID = ? AND date = ? AND time = ? `, 
      [data.movieID, data.cinemaID, data.date, data.time], 
      (err, result) => {
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
  insertTicket: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tickets SET ?', data, (err, result) => {
        if (!err) {
          connection.query("SELECT * FROM tickets WHERE userID = ? AND movieID = ? AND cinemasID = ? AND schedule = ? AND time = ? AND seat = ? ", [data.userID, data.movieID, data.cinemasID, data.schedule, data.time, data.seat],
          (err,resultShow)=>{
            if(!err){
              resolve(resultShow)
            } else{
              reject(new Error("Internal server error"))
            }
          })
        } else {
          reject(new Error("Internal server error"))
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
  },
  getTicketResult: (orderID, userID) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tickets WHERE userID = ? AND order_Id = ?', [userID, orderID], 
      (err, result) => {
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
