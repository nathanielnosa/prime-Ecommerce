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

module.exports = { updateUser }