const User = require('../models/User')
const CryptoJs = require('crypto-js')

const updateUser = async (req, res) => {
  const { user, email, image, pwd } = req.body
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    const encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD)
    if (user) foundUser.username = user
    if (email) foundUser.email = email
    if (image) foundUser.image = image
    if (pwd) foundUser.password = encryptPwd
    const result = await foundUser.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(302).json("No user with id found")
    const result = await foundUser.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(302).json("No user with id found")
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getUsers = async (req, res) => {
  const query = req.query.new
  try {
    const foundUser = query ? await User.find().sort({ createdAt: -1 }).limit(3).exec() : await User.find().exec()
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}


module.exports = { updateUser, deleteUser, getUser, getUsers }