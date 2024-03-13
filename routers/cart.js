const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { verifyAndAuthenticate, verifyAdminOnly } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAndAuthenticate, cartController.updateCart)
  .delete(verifyAdminOnly, cartController.deleteCart)
  .get(verifyAndAuthenticate, cartController.getCart)

router.route('/')
  .post(verifyAndAuthenticate, cartController.createCart)
  .get(verifyAdminOnly, cartController.getCarts)

module.exports = router