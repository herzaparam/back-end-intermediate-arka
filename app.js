require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const morgan = require('morgan')
const route = require('./src/routers/index')
const createError = require('http-errors')

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/v1', route)
app.use('/img', express.static('./image'))

app.use('*', (req, res, next) => {
    const error = new createError.NotFound()
    next(error)
})
app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500
    }
    res.json({
        message: err.message,
        status_error: err.status
    })
})

app.listen(port, () => {
    console.log('server is running port ' + port)
})
