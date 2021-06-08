const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); // Gets fields from config/default.json file

const PORT = process.env.PORT || 3000;

// Instantiate express and use express.json() for POST requests
const app = express();
app.use(express.json());

const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Api routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/countries', require('./routes/api/countries'));
app.use('/api/casino', require('./routes/api/casino'));

// Express backend listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
