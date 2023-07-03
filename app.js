const path = require('path');
const express = require('express');
const viewsRouter = require('./routes/viewsRoutes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// TEMPLATE ROUTES
app.use('/', viewsRouter);

module.exports = app;
