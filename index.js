require('dotenv').config()
const express = require('express')


// initialize an express object
const app = express()

// for json data
app.use(express.json())

//port
const PORT = process.env.PORT || 5890

//connect
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`)
})