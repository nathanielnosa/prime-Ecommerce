const Product = require('../models/Product')

const createProduct = async (req, res) => {
  const { title, description, size, color, inStock, isAvailable, price, category, image } = req.body
  try {
    const newProduct = await Product.create({
      title: title,
      description: description,
      size: size,
      color: color,
      inStock: inStock,
      isAvailable: isAvailable,
      price: price,
      category: category,
      image: image
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}
const updateProduct = async (req, res) => {
  const { title, description, size, color, inStock, isAvailable, price, category, image } = req.body
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (title) foundProduct.title = title
    if (description) foundProduct.description = description
    if (size) foundProduct.size = size
    if (color) foundProduct.color = color
    if (inStock) foundProduct.inStock = inStock
    if (isAvailable) foundProduct.isAvailable = isAvailable
    if (price) foundProduct.price = price
    if (category) foundProduct.category = category
    if (image) foundProduct.image = image

    const result = await foundProduct.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(302).json("No product with id found")
    const result = await foundProduct.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(302).json("No product with id found")
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getProducts = async (req, res) => {
  try {
    const foundProduct = await Product.find().exec()
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}


module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getProducts }