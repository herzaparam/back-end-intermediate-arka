const ticketModel = require('../model/ticket')
const helpers = require('../helper/printHelper')

exports.getTicket = (req, res) => {
  const sort = req.query.sort
  ticketModel.getTicket(sort)
    .then((result) => {
      const resultProduct = result
      helpers.printSuccess(res, resultProduct, 200)
    }).catch((err) => {
      console.log(err)
    })
}
exports.getHistoryTicket = (req, res) =>{
  const id = req.params.iduser
  ticketModel.getHistoryTicket(id)
  .then((result) => {
    const resultProduct = result
    helpers.printSuccess(res, 200, "get history succesfull", resultProduct)
  }).catch((err) => {
    console.log(err)
  })
}

exports.getTicketById = (req, res) => {
  const id = req.params.id
  ticketModel.getTicketById(id)
    .then((result) => {
      const resultProduct = result
      helpers.printSuccess(res, 200, "get ticket by id succesfull", resultProduct)
    }).catch((err) => {
      console.log(err)
    })
}

exports.insertTicket = async(req, res) => {

  const {  user_Id } = req.body.user
  const {city, date, btnId, time, totalPrice, selectedSeat, cinemaName} = req.body.order
  const {movie_Id, title} = req.body.order.films
  const newSeat = JSON.stringify(selectedSeat)

  const data = {
    userID: user_Id,
    movieID: movie_Id,
    movieTitle: title,
    cinemasID: btnId,
    cinemaName: cinemaName,
    totalPrice: totalPrice,
    schedule: date,
    time: time,
    seat: newSeat,
  }

  const check = await ticketModel.checkTicket(data)
  
  if(check.length > 1){
    return helpers.printError(res, 400, "Can't insert tickets with identical data")
  }
  ticketModel.insertTicket(data)
    .then((result) => {
      helpers.printSuccess(res, 200, "insert ticket succesfull", result)
    }).catch((err) => {
      helpers.printError(res, 500, err.message)
    })
}


exports.updateTicket = (req, res) => {
  const id = req.params.id
  const { order_Id, user_Id, movie_Id, location_Id, seat } = req.body
  const ticket = {
    order_Id,
    user_Id,
    movie_Id,
    location_Id,
    time_stamp: new Date(),
    seat
  }
  ticketModel.updateTicket(id, ticket)
    .then((result) => {
      const resultProduct = result
      helpers.printSuccess(res, 200, "update ticket succesfull", resultProduct)
    }).catch((err) => {
      console.log(err)
    })
}
exports.deleteTicket = (req, res) => {
  const id = req.params.id
  ticketModel.deleteTicket(id)
    .then((result) => {
      const resultProduct = result
      helpers.printSuccess(res, 200, "delete ticket succesfull", resultProduct)
    }).catch((err) => {
      console.log(err)
    })
}
