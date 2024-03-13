const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  size: Array,
  color: Array,
  inStock: Number,
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true },
  category: { type: Array }
}, { timestamps: true })

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel