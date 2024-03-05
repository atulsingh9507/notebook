const connectToMongo = require('./db');

connectToMongo();
const express = require('express')
const app = express()
const port = 3000

// Available Routes
app.use('/app/auth', require('./routes/auth.js'))
app.use('/app/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})