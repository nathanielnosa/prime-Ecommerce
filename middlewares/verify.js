const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  const authHeaders = req.headers['authorization']// Bearer <token>
  if (authHeaders) {
    const token = authHeaders.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(401).json('Unauthorized user')
      req.user = user
      next()
    })
  } else {
    res.status(400).json("Invalid Token")
  }
}

const verifyAndAuthenticate = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }
  })
}

module.exports = { verifyToken, verifyAndAuthenticate }