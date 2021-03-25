const redis = require('redis')
const client = redis.createClient(6379)
const helper = require('../helper/helper')

const cacheAllNowMovies = (req, res, next) => {
    client.get('getAllNowMovies', (err, data) => {
        if (data) {
            const result = JSON.parse(data)
            return helper.response(res, result, 200, {message : 'this is from redis'})
        } else {
            next()
        }
    })
}
const cacheAllUpMovies = (req, res, next) => {
    client.get('getAllUpMovies', (err, data) => {
        if (data) {
            const result = JSON.parse(data)
            return helper.response(res, result, 200, {message : 'this is from redis'})
        } else {
            next()
        }
    })
}
const cacheLimNowMovies = (req, res, next) => {
    client.get('getLimNowMovies', (err, data) => {
        if (data) {
            const result = JSON.parse(data)
            return helper.response(res, result, 200, null)
        } else {
            next()
        }
    })
}
const cacheLimUpMovies = (req, res, next) => {
    client.get('getLimUpMovies', (err, data) => {
        if (data) {
            const result = JSON.parse(data)
            return helper.response(res, result, 200, null)
        } else {
            next()
        }
    })
}

const clearAllMovies = (req, res, next) => {
    client.del("getAllProduct")
    next()
}
module.exports = {
    cacheAllNowMovies,
    cacheAllUpMovies,
    cacheLimUpMovies,
    cacheLimNowMovies,
    clearAllMovies

}