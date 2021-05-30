const connection = require('../config/db')

const location = {
  getLocation: (city) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id FROM cities WHERE name = ?', city,
        (err, resultCity) => {
          if (!err) {
            connection.query(`SELECT * FROM cinemas WHERE cityID = ?`, resultCity[0].id,
              (err, result) => {
                if (!err) {
                  resolve(result)
                } else {  
                  reject(new Error("Internal Server Error"))
                }
              })
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
