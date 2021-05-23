const moviesModel = require('../model/movie')
const createError = require('http-errors')
const helpers = require('../helper/printHelper')
const { v4: uuidv4 } = require('uuid')
const redis = require('redis')
const client = redis.createClient(6379)

exports.getAllMovies = (req, res, next) => {
    const { page, perPage } = req.query;
    const keyword = req.query.keyword ? req.query.keyword : "";

    moviesModel.getAllMovies(page, perPage, keyword)
        .then(([totalData, totalPage, result, page, perPage]) => {
            if (result < 1) {
                helper.printError(res, 404, "movie not found");
                return;
            }
            const resultMovies = result
            client.setex("getAllNowMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            helpers.printPaginate(
                res,
                200,
                "Find all movie successfully",
                totalData,
                totalPage,
                result,
                page,
                perPage
            );
        })
        .catch((err) => {
            helper.printError(res, 500, err.message);
        })
}

exports.getAllNowMovies = (req, res, next) => {
    moviesModel.getAllNowMovies()
        .then((result) => {
            const resultMovies = result
            client.setex("getAllNowMovies", 60 * 60 * 12, JSON.stringify(resultMovies))

            helpers.printSuccess(res, 200, "Succesfully get all now movie", resultMovies)
        })
        .catch((err) => {
            helpers.printError(res, 500, new Error("internal server error"))
        })
}
exports.getLimNowMovies = (req, res, next) => {
    moviesModel.getLimNowMovies()
        .then((result) => {
            const resultMovies = result
            client.setex("getLimNowMovies", 60 * 60 * 12, JSON.stringify(resultMovies))
            helpers.printSuccess(res, 200, "Succesfully get lim now movie", resultMovies)
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
            helpers.printSuccess(res, 200, "Succesfully get all up movie", resultMovies)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
exports.getLimUpMovies = (req, res, next) => {
    moviesModel.getLimUpMovies()
        .then((result) => {
            const resultMovies = result
            client.setex("getLimUpMovies", 60 * 60 * 12, JSON.stringify(resultMovies))

            helpers.printSuccess(res, 200, "Succesfully get lim up movie", resultMovies)

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
            helpers.printSuccess(res, 200, "Succesfully get this movie", resultProduct)
        })
        .catch((err) => {
            helpers.printError(res, 500, new Error("Internal serbver error"))
        })
}


exports.insertMovies = (req, res, next) => {
    const { title, date_show, genre, movie_duration, directed_by, casts, Synopsis, price } = req.body
    const detail = {
        movie_Id: uuidv4(),
        title,
        date_show,
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
            helpers.printSuccess(res, 200, "Succesfully get all movie", resultProduct)
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
            helpers.printSuccess(res, 200, "Succesfully get all movie", resultProduct)
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
            helpers.printSuccess(res, 200, "Succesfully get all movie", resultProduct)
        })
        .catch((err) => {
            const error = new createError.InternalServerError()
            next(error)
        })
}
