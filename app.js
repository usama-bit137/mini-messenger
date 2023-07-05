const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const messageRouter = require('./routes/messageRoutes');
const viewsRouter = require('./routes/viewsRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// DATABASE ROUTES
app.use('/messages', messageRouter);

// TEMPLATE ROUTES
app.use('/', viewsRouter);

module.exports = app;
