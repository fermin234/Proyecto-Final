const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors');
const session = require('express-session');
const URL_CLIENT = process.env.URL_CLIENT || 'http://localhost:3000'

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50Mb' }));
server.use(bodyParser.json({ limit: '50Mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(session({secret: 'pf-henry', resave: false, saveUninitialized: false}))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${URL_CLIENT || '*'}`); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', router);

module.exports = server;
