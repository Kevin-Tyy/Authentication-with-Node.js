const express = require('express');
const route = express.Router();

route.get("/home",  (req, res) => {
  if(req.session.loggedin== true){
      const username = req.session.username;
      const email = req.session.email;
      const password = req.session.password;
     res.render('home', {username: username,  email: email, password: password});
    
  }else{
    req.flash('error', 'Login to continue');
    res.redirect('login');
  }

  });


module.exports  = route;
