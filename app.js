
const express = require("express");
const mysql = require("mysql");
const connection = require("./models/db_config");
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT



const loginRoute = require('./routes/loginRouter');
const registerRoute = require('./routes/registerRouter');
const dasboardRoute = require('./routes/dashboardRouter');
const logoutRouter = require('./routes/logoutRouter');
const imageUpload = require('./routes/imageUpload');
const viewProfile = require('./routes/viewProfile');
const auth = require('./routes/authentication');
const editProfile = require('./routes/editProfile');
const processing = require('./routes/process')


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}))

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(flash())

app.set("view engine", "ejs");

app.use('/', loginRoute);
app.use('/', registerRoute);
app.use('/', dasboardRoute);
app.use('/', logoutRouter);
app.use('/', imageUpload);
app.use('/', viewProfile);
app.use('/', auth);
app.use('/', editProfile)
app.use('/', processing);



app.use(session({
  secret: "kevinwebapp",
  resave: false,
  saveUninitialized: true,
  cookie:{ maxAge: 6000}
}))




app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}...`);
});
