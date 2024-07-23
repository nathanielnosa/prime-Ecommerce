require('dotenv').config()
const express = require('express')
const connectDB = require('./config/dbConfig')
const mongoose = require('mongoose')

// initialize an express object
const app = express()

// for json data
app.use(express.json())
//db config
connectDB()

// register routers
app.use('/api/register', require('./routers/auth/register'))
app.use('/api/login', require('./routers/auth/login'))
app.use('/api/user', require('./routers/user'))
app.use('/api/product', require('./routers/product'))
app.use('/api/cart', require('./routers/cart'))
app.use('/api/order', require('./routers/order'))


//port
const PORT = process.env.PORT || 5890

//connect
mongoose.connection.once('open', () => {
  console.log('Database connection success!')

  app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
  })
})