const express = require('express')
const router = express.Router()
const locationController = require('../controller/location')

router
  .get('/', locationController.getLocation)
  .get('/:id', locationController.getLocationById)
  .post('/', locationController.insertLocation)
  .put('/:id', locationController.updateLocation)
  .delete('/:id', locationController.deleteLocation)

module.exports = router
