const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const { verifyAcces } = require('../middleware/auth')
const {uploadMulter} = require('../middleware/uploadimg')


router
  .get('/profile', userController.sendEmail)
  .get('/profile/:iduser', verifyAcces, userController.getUserById)       
  .post('/register', userController.register)                              
  .post('/login', userController.login)                                    
  .put('/profile/:iduser', verifyAcces, uploadMulter.single('image'), userController.updateUser)            
  .delete('/:id', userController.deleteUser)

module.exports = router
