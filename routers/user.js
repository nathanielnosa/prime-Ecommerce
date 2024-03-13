const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyAndAuthenticate, verifyAdminOnly } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAndAuthenticate, userController.updateUser)
  .delete(verifyAndAuthenticate, userController.deleteUser)
  .get(verifyAndAuthenticate, userController.getUser)

router.route('/')
  .get(verifyAdminOnly, userController.getUsers)
module.exports = router