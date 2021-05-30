const locationModel = require('../model/transaction')

exports.getUserTransaction = (req, res) => {
  locationModel.getUserTransaction()
    .then((result) => {
      res.json({
        history: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, "internal server error")
    })
}

exports.getSortTransaction = (req, res) => {
  locationModel.getSortTransaction()
    .then((result) => {
      res.json({
        history: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, "internal server error")
    })
}
