const connection = require('../config/db')

const location = {
  getLocation: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cinema_location', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getLocationById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cinema_location WHERE location_Id = ?', id, (err, result) => {
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
  insertLocation: (loc) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO cinema_location SET ?', loc, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateLocation: (id, loc) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE cinema_location SET ? WHERE location_Id = ?', [loc, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteLocation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM cinema_location WHERE location_Id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = location
