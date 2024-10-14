const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const consoRouter = require('./routes/conso');
const adminRouter = require('./routes/admin');

const verifyToken = require('./utils/isJWT');
const isAdmin = require('./utils/isAdmin');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/conso', verifyToken, consoRouter);
app.use('/api/admin', verifyToken, isAdmin, adminRouter);
app.use('/api', indexRouter);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = app;
