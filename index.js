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

//port
const PORT = process.env.PORT || 5890

//connect
mongoose.connection.once('open', () => {
  console.log('Database connection success!')

  app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
  })
})