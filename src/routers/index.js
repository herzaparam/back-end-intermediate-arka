const express = require('express')
const route = express.Router()
const routeMovie = require('./movie')
const routeLocation = require('./location')
const routeTicket = require('./ticket')
const routeTransaction = require('./transaction')
const routeUser = require('./user')


route.use('/movies', routeMovie)
route.use('/location', routeLocation)
route.use('/ticket', routeTicket)
route.use('/transaction', routeTransaction)
route.use('/user', routeUser)

module.exports = route