const locationModel = require('../model/transaction')

exports.getUserTransaction = (req, res) => {
  locationModel.getUserTransaction()
    .then((result) => {
      res.json({
        history: result
      })
    }).catch((err) => {
      console.log(err)
    })
}

exports.getSortTransaction = (req, res) => {
  locationModel.getSortTransaction()
    .then((result) => {
      res.json({
        history: result
      })
    }).catch((err) => {
      console.log(err)
    })
}
// exports.insertTransaction = (req, res) => {
//   const { transaction_Id, order_Id } = req.body
//   const history = {
//     transaction_Id,
//     order_Id
//   }
//   locationModel.insertTransaction(history)
//     .then((result) => {
//       res.json({
//         history: result
//       })
//     }).catch((err) => {
//       console.log(err)
//     })
// }
// exports.updateTransaction = (req, res) => {
//   const id = req.params.id
//   const { transaction_Id, order_Id } = req.body
//   const history = {
//     transaction_Id,
//     order_Id
//   }
//   locationModel.updateTransaction(id, history)
//     .then((result) => {
//       res.json({
//         history: result
//       })
//     }).catch((err) => {
//       console.log(err)
//     })
// }
// exports.deleteTransaction = (req, res) => {
//   const id = req.params.id
//   locationModel.deleteTransaction(id)
//     .then((result) => {
//       res.json({
//         history: result
//       })
//     }).catch((err) => {
//       console.log(err)
//     })
// }
