const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/countries', require('./routes/api/countries'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


