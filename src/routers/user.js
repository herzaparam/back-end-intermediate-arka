const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const { verifyAcces, isLoggedIn } = require('../middleware/auth')
const { uploadMulter } = require('../middleware/uploadimg')


router
  .get('/profil', userController.sendEmail)
  .get('/profile/:iduser', verifyAcces, userController.getUserById)
  .get('/verify', userController.verify)
  .post('/profile', isLoggedIn, userController.getUserByToken)
  .post('/register', uploadMulter.single('image'), userController.register)
  .post('/login', userController.login)
  .post("/forgot-password", userController.forgotPassword)
  .put("/reset-password", userController.resetPassword)
  .put('/profile/:iduser', uploadMulter.single('image'), userController.updateUser)
  .delete('/:id', userController.deleteUser)

module.exports = router
