const express = require("express");
const route = express.Router();
const connection = require("../models/db_config");

route.get("/viewProfile", (req, res) => {
  if (req.session.loggedin == true) {
    res.render("viewProfile");
  } else {
    req.flash("error", "Login to continue");
    res.redirect("login");
  }
});
route.post("/viewProfile", (req, res) => {
    if (req.session.loggedin) {
        const username = req.session.username;
        const query = `SELECT * FROM user_table WHERE username = "${username}";`;
        connection.query(query, (err, data)=>{
            if(err){
                throw err.message;
            }
            else{
                if(data.length >0){
                    for(let i =0 ; i<data.length; i++){
                        const email = data[i].email;
                        const password = data[i].password;
                        const username = data[i].username;


                        res.render('viewProfile' , {
                            username: username,
                            email : email,
                            password : password
                        })
                        
                    }
                }
            }
        })
    } else {
    req.flash("error", "Login to continue");
    res.redirect("login");
  }
});
route.post('/gohome', (req, res)=>{
  if(req.session.loggedin== true){
    res.redirect('/home');
  }else{
    req.flash('error', 'Login to continue');
    res.redirect('home')
  }
})

module.exports = route;
