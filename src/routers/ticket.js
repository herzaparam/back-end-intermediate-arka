const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticket')

router
  // .get('/', ticketController.getTicket)
  .get('/:iduser', ticketController.getHistoryTicket)
  // .get('/:id', ticketController.getTicketById)
  .post('/', ticketController.insertTicket)
  .put('/:id', ticketController.updateTicket)
  .delete('/:id', ticketController.deleteTicket)

module.exports = router
