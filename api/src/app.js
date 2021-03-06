require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const userRoute = require('../routes/user/userRoute');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

// middleware
app.use(morgan(morganOption, { skip: () => NODE_ENV === 'test' }));
app.use(helmet());
app.use(cors());

// routes
app.use('/api', userRoute);

// basic error handling
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = app;
