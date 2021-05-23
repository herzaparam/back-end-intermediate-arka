const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticket')
const { verifyAcces, isLoggedIn } = require('../middleware/auth')

router
  // .get('/', ticketController.getTicket)
  .get('/:iduser', ticketController.getHistoryTicket)
  .post('/ticket-result/:idorder', isLoggedIn, ticketController.getTicketResult)
  // .get('/:id', ticketController.getTicketById)
  .post('/', ticketController.insertTicket)
  .put('/:id', ticketController.updateTicket)
  .delete('/:id', ticketController.deleteTicket)

module.exports = router
