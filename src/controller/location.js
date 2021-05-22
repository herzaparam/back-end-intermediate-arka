const locationModel = require('../model/location')
const helpers = require('../helper/printHelper')

exports.getLocation = (req, res) => {
  const city = req.query.city
  locationModel.getLocation(city)
    .then((result) => {
      helpers.printSuccess(res, 200, "succesfully get cinema", result)
    }).catch((err) => {
      helpers.printError(res, 500, new Error("Internal server error"))
    })
}
exports.getLocationById = (req, res) => {
  const id = req.params.id
  locationModel.getLocationById(id)
    .then((result) => {
      res.json({
        location: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, new Error("Internal server error"))
    })
}
exports.insertLocation = (req, res) => {
  const { location_Id, city, cinema, date } = req.body
  const loc = {
    location_Id,
    city,
    cinema,
    date
  }
  locationModel.insertLocation(loc)
    .then((result) => {
      res.json({
        location: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, new Error("Internal server error"))
    })
}
exports.updateLocation = (req, res) => {
  const id = req.params.id
  const { location_Id, city, cinema, date } = req.body
  const loc = {
    location_Id,
    city,
    cinema,
    date
  }
  locationModel.updateLocation(id, loc)
    .then((result) => {
      res.json({
        location: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, new Error("Internal server error"))
    })
}
exports.deleteLocation = (req, res) => {
  const id = req.params.id
  locationModel.deleteLocation(id)
    .then((result) => {
      res.json({
        location: result
      })
    }).catch((err) => {
      helpers.printError(res, 500, new Error("Internal server error"))
    })
}
