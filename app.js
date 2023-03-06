const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cardsRoutes = require('./routes/cards');
const { NOT_FOUND } = require('./errors/errors_constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
  //  console.log('Error on database connection');
    console.error(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   req.user = {
// id: '63ef1ba9f92d535c71085ff3', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// // авторизация
app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(
  (req, res) => {
    res.status(NOT_FOUND).send({ message: 'Неправильный путь' });
  },
);

app.listen(PORT);
