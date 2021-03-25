const moviesModel = require('../model/movie')
const createError = require('http-errors')
const helpers = require('../helper/helper')
const { v4: uuidv4 } = require('uuid')
const redis = require('redis')
const client = redis.createClient(6379)

exports.getAllNowMovies = (req, res, next) => {
    moviesModel.getAllNowMovies()
        .then((result) => {
            const resultMovies = result
            client.setex("getAllNowMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            
                helpers.response(res, resultMovies, 200)
           
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
exports.getLimNowMovies = (req, res, next) => {
    const limit = req.query.limit
    const page = req.query.page
    moviesModel.getLimNowMovies(limit, page)
        .then((result) => {
            const resultMovies = result
            client.setex("getLimNowMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            
                helpers.response(res, resultMovies, 200)
          
        }).catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
exports.getAllUpMovies = (req, res, next) => {
    moviesModel.getAllUpMovies()
        .then((result) => {
            const resultMovies = result
            client.setex("getAllUpMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            
                helpers.response(res, resultMovies, 200)
            
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
exports.getLimUpMovies = (req, res, next) => {
    const limit = req.query.limit
    const page = req.query.page
    moviesModel.getLimUpMovies(limit, page)
        .then((result) => {
            const resultMovies = result
            client.setex("getLimUpMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            
                helpers.response(res, resultMovies, 200)
            
        }).catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
exports.getMoviesById = (req, res, next) => {
    const id = req.params.id
    moviesModel.getMoviesById(id)
        .then((result) => {
            const resultProduct = result
            helpers.response(res, resultProduct, 200)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}


exports.insertMovies = (req, res, next) => {
    const { title, genre, movie_duration, directed_by, casts, Synopsis, price } = req.body
    const detail = {
        movie_Id: uuidv4(),
        title,
        genre,
        movie_duration,
        directed_by,
        casts,
        Synopsis,
        price,
        image: `http://localhost:8000/img/${req.file.filename}`
    }
    moviesModel.insertMovies(detail)
        .then((result) => {
            const resultProduct = result
            helpers.response(res, resultProduct, 200)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}

exports.updateMovies = (req, res, next) => {
    const moviesId = req.params.id
    const { title, genre, movie_duration, directed_by, casts, Synopsis, price } = req.body
    const data = {

        title,
        genre,
        movie_duration,
        directed_by,
        casts,
        Synopsis,
        price,
        image: `http://localhost:8000/img/${req.file.filename}`

    }
    moviesModel.updateMovies(moviesId, data)
        .then((result) => {
            const resultProduct = result
            helpers.response(res, resultProduct, 200)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}

exports.deleteMovies = (req, res, next) => {
    const movieId = req.params.id
    moviesModel.deleteMovies(movieId)
        .then((result) => {
            const resultProduct = result
            helpers.response(res, resultProduct, 200)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
