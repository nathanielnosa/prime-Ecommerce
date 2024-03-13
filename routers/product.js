const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { verifyAndAuthenticate, verifyAdminOnly } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAdminOnly, productController.updateProduct)
  .delete(verifyAdminOnly, productController.deleteProduct)
  .get(productController.getProduct)

router.route('/')
  .post(verifyAdminOnly, productController.createProduct)
  .get(productController.getProducts)

module.exports = router