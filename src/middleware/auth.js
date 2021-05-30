const jwt = require('jsonwebtoken')
const helpers = require('../helper/helper')

const isLoggedIn = (req, res, next) =>{
    const auth = req.body.headers.Authorization
    jwt.verify(auth, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return helpers.response(res, null, 401, { message: 'invalid signature' })
            } else if (err.name === 'TokenExpiredError') {
                return helpers.response(res, null, 401, { message: 'token expired' })
            } else {
                return helpers.response(res, null, 401, { message: 'token not active' })

            }
        }
        req.email = decoded.email
        req.role = decoded.role
        req.userID = decoded.userID
        next()
    })

}

const verifyAcces = (req, res, next) => {
    const auth = req.headers.authorization 
    if (!auth) {
        return helpers.response(res, null, 401, { message: 'server need token' })
    }
    jwt.verify(auth, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return helpers.response(res, null, 401, { message: 'invalid signature' })
            } else if (err.name === 'TokenExpiredError') {
                return helpers.response(res, null, 401, { message: 'token expired' })
            } else {
                return helpers.response(res, null, 401, { message: 'token not active' })

            }
        }
        req.email = decoded.email
        req.role = decoded.role
        req.userID = decoded.userID

        next()
    })
}

const roleAdmin = (req, res, next) => {
    if (req.role !== 1) {
        return helpers.response(res, null, 401, { message: 'you need to login as admin to acces this page' })
    }
    next()
}

module.exports = {
    verifyAcces,
    roleAdmin,
    isLoggedIn
}