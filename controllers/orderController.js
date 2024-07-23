const Order = require('../models/Order')

const createOrder = async (req, res) => {
  const { userId, products, amount, address, status } = req.body
  try {
    const newOrder = await Order.create({
      userId,
      products,
      amount,
      address,
      status
    })
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}
const updateOrder = async (req, res) => {
  const { userId, products, amount, address, status } = req.body
  try {
    const foundOrder = await Order.findOne({ _id: req.params.id }).exec()
    if (userId) foundOrder.userId = userId
    if (products) foundOrder.products = products
    if (amount) foundOrder.amount = amount
    if (address) foundOrder.address = address
    if (status) foundOrder.status = status

    const result = await foundOrder.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteOrder = async (req, res) => {
  try {
    const foundOrder = await Order.findOne({ _id: req.params.id }).exec()
    if (!foundOrder) return res.status(302).json("No Order with id found")
    const result = await foundOrder.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getOrder = async (req, res) => {
  try {
    const foundOrder = await Order.findOne({ _id: req.params.id }).exec()
    if (!foundOrder) return res.status(302).json("No Order with id found")
    res.status(200).json(foundOrder)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getOrders = async (req, res) => {
  try {
    const foundOrder = await Order.find().exec()
    res.status(200).json(foundOrder)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}


module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getOrders }