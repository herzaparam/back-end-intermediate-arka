const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction')

router
  .get('/', transactionController.getUserTransaction)
  .get('/sort-trans/', transactionController.getSortTransaction)
  // .post('/', transactionController.insertTransaction)
  // .put('/:id', transactionController.updateTransaction)
  // .delete('/:id', transactionController.deleteTransaction)

module.exports = router
