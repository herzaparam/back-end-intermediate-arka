require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const morgan = require('morgan')
const route = require('./src/routers/index')
const createError = require('http-errors')
const path = require("path");

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/v1', route)
app.use('/image', express.static(path.join(__dirname, "image")))

app.use('*', (req, res, next) => {
    const error = new createError.NotFound()
    next(error)
})
app.use((err, req, res, next) => {
    if (err.message === "Uploaded file must be png, jpg or jpeg file") {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    } else if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).send({
        status: false,
        message: "File image too large",
      });
    } else {
      res.status(404).send({
        status: false,
        message: err.message,
      });
    }
  });

app.listen(port, () => {
    console.log('server is running port ' + port)
})
