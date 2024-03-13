const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyAndAuthenticate } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAndAuthenticate, userController.updateUser)
  .delete(verifyAndAuthenticate, userController.deleteUser)
module.exports = router