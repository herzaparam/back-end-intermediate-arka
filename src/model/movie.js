const connection = require('../config/db')

const movies = {
    getAllNowMovies: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM movie_details WHERE date_show ="now"', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getLimNowMovies: (limit, page) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM movie_details WHERE date_show = 'now' LIMIT ${(limit * page) - limit}, ${limit} `, (err, result) => {
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
    getAllUpMovies: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM movie_details WHERE date_show ="upcoming"', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getLimUpMovies: (limit, page) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM movie_details WHERE date_show = 'upcoming' LIMIT ${(limit * page) - limit}, ${limit} `, (err, result) => {
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
    getMoviesById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM movie_details WHERE movie_Id = ?', id, (err, results) => {
                if (!err) {
                    resolve(results)
                } else {
                    reject(err)
                }
            })
        })
    },

    insertMovies: (detail) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO movie_details SET ?', detail, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateMovies: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE movie_details SET ? WHERE movie_Id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deleteMovies: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM movie_details WHERE movie_ID = ?', id, (err, results) => {
                if (!err) {
                    resolve(results)
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = movies
