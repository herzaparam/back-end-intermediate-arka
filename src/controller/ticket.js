const ticketModel = require('../model/ticket')
const movieModel = require('../model/movie')
const helpers = require('../helper/printHelper')
const moment = require('moment')
moment.locale("id")

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

exports.getUserTicket = (req, res) => {
  const userID = req.userID

  ticketModel.getUserTicket(userID)
    .then((result) => {
       let newResult = result.map((d)=>{
          return {
            order_Id: d.order_Id,
            userID: d.userId,
            movieID: d.movieID,
            movieTitle: d.movieTitle,
            cinemasID: d.cinemasID,
            cinemaName: d.cinemaName,
            totalPrice: d.totalPrice,
            schedule: moment(d.schedule).format('LL'),
            time: d.time,
            seat: d.seat,
            id: d.id,
            name: d.name,
            image: d.image,
            address: d.address,
            price: d.price,
            cityID: d.cityID
        }
        })
      helpers.printSuccess(res, 200, "get ticket by user succesfull", newResult)
    }).catch((err) => {
      helpers.printError(res, 500, "internal server error")
    })
}

exports.getHistoryTicket = (req, res) => {
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

exports.insertTicket = async (req, res) => {
  const { user_Id } = req.body.user
  const { city, date, btnId, time, totalPrice, selectedSeat, cinemaName } = req.body.order
  const { movie_Id, title } = req.body.order.films
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

  if (check.length > 1) {
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
exports.getTicketResult = async (req, res) => {
  const idUser = req.userID
  const orderID = req.params.idorder
  try {
    const result = await ticketModel.getTicketResult(orderID, idUser)
    const {
      order_Id,
      userID,
      movieID,
      movieTitle,
      cinemasID,
      cinemaName,
      totalPrice,
      schedule,
      time,
      seat } = result[0]
    const newSeat = JSON.parse(seat)
    const newDate = moment(schedule).format('LL');

    const resultMovie = await movieModel.getMoviesById(movieID)
    const { genre } = resultMovie[0]

    const newResult = {
      order_Id,
      userID,
      movieID,
      movieTitle,
      cinemasID,
      cinemaName,
      totalPrice,
      newDate,
      time,
      newSeat,
      genre
    }
    helpers.printSuccess(res, 200, "get ticket success", newResult)

  } catch {
    helpers.printError(res, 500, "Internal server error")
  }


}
