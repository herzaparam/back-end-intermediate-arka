const connection = require('../config/db')

const movies = {
    getAllMovies: (queryPage, queryPerPage, keyword) => {
        // return new Promise((resolve, reject) => {
        //     connection.query('SELECT * FROM movie_details ', (err, result) => {
        //         if (!err) {
        //             resolve(result)
        //         } else {
        //             reject(err)
        //         }
        //     })
        // })
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) AS totalData FROM movie_details WHERE title LIKE ?  `,
                [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
                (err, result) => {
                    let totalData, page, perPage, totalPage;
                    if (err) {
                        reject(new Error("Internal server error"));
                    } else {
                        totalData = result[0].totalData;
                        page = queryPage ? parseInt(queryPage) : 1;
                        perPage = queryPerPage ? parseInt(queryPerPage) : 5;
                        totalPage = Math.ceil(totalData / perPage);
                    }
                    const firstData = perPage * page - perPage;
                    connection.query(
                        `SELECT * FROM movie_details WHERE title LIKE ? LIMIT ?, ?`,
                        [`%${keyword}%`, firstData, perPage],
                        (err, result) => {
                            if (err) {
                                reject(new Error("Internal server error"));
                            } else {
                                resolve([totalData, totalPage, result, page, perPage]);
                            }
                        }
                    );
                }
            );
        });
    },
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
    getLimNowMovies: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM movie_details WHERE date_show = 'now' LIMIT 5 `, (err, result) => {
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
    getLimUpMovies: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM movie_details WHERE date_show = 'upcoming' LIMIT 5`, (err, result) => {
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
