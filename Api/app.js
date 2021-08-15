var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var repositorioGit = require('./routes/repositorioGit');

const registroUsuario = require('./middlewares/registroUsuario')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(registroUsuario)

app.use('/', repositorioGit);

module.exports = app;
