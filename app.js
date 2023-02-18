const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const routes = require('./routes/users.js');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
.then(() => {
  console.log('Database connected.');
})
.catch((err) => {
  console.log('Error on database connection');
  console.error(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


app.listen(PORT);
