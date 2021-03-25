const locationModel = require('../model/location')

exports.getLocation = (req, res) => {
  locationModel.getLocation()
    .then((result) => {
      res.json({
        location: result
      })
    }).catch((err) => {
      console.log(err)
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
      console.log(err)
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
      console.log(err)
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
      console.log(err)
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
      console.log(err)
    })
}
