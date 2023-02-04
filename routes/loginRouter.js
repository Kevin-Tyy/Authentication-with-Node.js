const express = require("express");
const route = express.Router();
const connection = require("../models/db_config");
const session = require("express-session");


route.use(session({
  secret: 'kevinwebapp',
  resave : false,
  saveUninitialized: true
}))




route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/login", (req, res) => {
  const username = req.body.username;
  
  const password = req.body.password;
  if (username && password) {
    const query = `SELECT * FROM  user_table WHERE username = "${username}";`;

    connection.query(query, (err, data) => {
      if (err) throw err.message;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].password == password) {
            req.session.loggedin = true;
            req.session.username = username;
            req.session.password = password;
            res.redirect("home");
          } else {
            req.flash('error', "Incorrect password");
            res.redirect('login')
          }
        }
      } else {
        req.flash('error', "Username not found");
        res.redirect('login');
      }
    });
  }else{

    if (username == "") {
      req.flash('error', "Please enter a username");
      res.redirect('login');
    }
    if (password == "") {
      req.flash('error', "Please enter a password");
      res.redirect('login');
    }
  }
});

module.exports = route;
