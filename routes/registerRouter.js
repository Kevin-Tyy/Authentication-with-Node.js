const express = require("express");
const route = express.Router();
const session = require("express-session");
const connection = require("../models/db_config");

route.use(
  session({
    secret: "kevinwebapp",
    resave: false,
    saveUninitialized: true,
  })
);

route.get("/register", (req, res) => {
  res.render("register");
});

route.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (username !== "" && email !== "" && password == password2) {
    const query = `SELECT * FROM user_table WHERE username="${username}"`;

    connection.query(query, (err, data) => {
      if (err) {
        throw err.message;
      }
      if (data.length >= 1) {
        req.flash("error", "Username already exists");
        res.redirect("/register");
      } else {
        const query = `SELECT * FROM user_table WHERE email= "${email}"`;

        connection.query(query, (err, data) => {
          if (err) {
            throw err.message;
          }

          if (data.length > 0) {
            req.flash("error", "Looks like email was already used to sign up");
            res.redirect("/register");
          } else {
            const sql = `INSERT INTO user_table(username, email, password, created_at) VALUES ("${username}", "${email}", "${password}", NOW());`;

            connection.query(sql, (err, rows) => {
              if (err) throw err.message;
              req.session.loggedin = true;
              req.session.username = username;
              req.session.email = email;
              req.session.password = password;

              res.redirect("home");
            });
          }
        });
      }
    });
  } else {
    if (password !== password2) {
      req.flash("error", "Passwords do not match");
      res.redirect("/register");
    }
    if (username == "") {
      req.flash("error", "Username cannot be blank");
      res.redirect("/register");
    }
    if (email == "") {
      req.flash("error", "Email cannot be blank");
      res.redirect("register");
    }
    if (password == "") {
      req.flash("error", "Please enter a password");
      res.redirect("register");
    }
    if (password2 == "") {
      req.flash("error", "please confirm your password");
      res.redirect("register");
    }
  }
});

module.exports = route;
