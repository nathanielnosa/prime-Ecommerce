const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { verifyAndAuthenticate, verifyAdminOnly } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAndAuthenticate, orderController.updateOrder)
  .delete(verifyAdminOnly, orderController.deleteOrder)
  .get(verifyAndAuthenticate, orderController.getOrder)

router.route('/')
  .post(verifyAndAuthenticate, orderController.createOrder)
  .get(verifyAdminOnly, orderController.getOrders)

module.exports = router