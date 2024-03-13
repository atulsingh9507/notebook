const connectToMongo = require('./db');

connectToMongo();
const express = require('express');
const app = express();
app.use(express.json());


const port =6000

// Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Notebook backend listening on port ${port}`)
})