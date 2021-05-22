const connection = require('../config/db')

const location = {
  getLocation: (city) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT cinemas.id, cinemas.name, cinemas.image, cinemas.address, cinemas.address, cinemas.price, cities.name AS cityName FROM cinemas iNNER JOIN cities ON cinemas.cityID = cities.id WHERE cities.name = ? ', city ,(err, result) => {
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
      connection.query('SELECT * FROM cinemas WHERE location_Id = ?', id, (err, result) => {
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
      connection.query('INSERT INTO cinemas SET ?', loc, (err, result) => {
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
      connection.query('UPDATE cinemas SET ? WHERE location_Id = ?', [loc, id], (err, result) => {
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
      connection.query('DELETE FROM cinemas WHERE location_Id = ?', id, (err, result) => {
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
