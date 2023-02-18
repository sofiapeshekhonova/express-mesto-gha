const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards')
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


app.use((req, res, next) => {
  req.user = {
    _id: '63ef1ba9f92d535c71085ff3' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  return res.status(404).send({ message: 'Неправильный путь' })
});

app.use(cors());



module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

app.listen(PORT);
