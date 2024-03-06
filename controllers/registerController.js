const User = require('../models/User')
const CryptoJs = require('crypto-js')
// npm i crypto-js
const handleRegister = async (req, res) => {
  const { user, email, image, pwd } = req.body
  if (!user || !email || !pwd) return res.status(401).json("Fields cannot be empty")
  try {
    encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD)
    const newUser = await User.create({
      username: user,
      email: email,
      image: image,
      password: encryptPwd
    })
    res.status(201).json(newUser)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { handleRegister }