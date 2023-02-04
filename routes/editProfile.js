const express = require('express');
const route = express.Router();
const connection = require('../models/db_config');

route.use(express.json());
route.use(express.urlencoded({extended: false}));

route.get('/updateProfile', (req,res)=>{
  if(req.session.loggedin == true){
    res.render('updateProfile');
    
  }
  else{
    req.flash('error', 'Login to continue');
    res.redirect('/login');
  }
})
route.post('/edit', (req, res)=>{
  if(req.session.loggedin==true){
    username = req.session.username;
    new_username = req.body.username;
    new_password = req.body.password;
    new_password_conf = req.body.password2;

    if(new_username!==""&&new_password!==""&&new_password_conf!==""&&new_password==new_password_conf){
      const query = `SELECT * FROM user_table WHERE username = "${username}";`;
      connection.query(query, (err, data)=>{
        if(err){
          throw err.message;
        }
        else{

          const query = `UPDATE user_table
       SET 
       username="${new_username}",
       password="${new_password}"
       WHERE
       username= "${username}";`;
          connection.query(query, (err , data)=>{
            if(err){
              throw err.message;
            }else{
              req.flash('success', 'Your profile has been successfully updated');
              res.redirect('updateProfile');
            }
          })
        }
      })
    }else{
      if(new_username==""){
        req.flash('error', 'Enter a username');
        res.redirect('updateProfile');
      }
      if(new_password==""){
        req.flash('error', 'Enter a password');
        res.redirect('updateProfile')
      }
      if(new_password_conf==""){
        req.flash('error', 'Confirm your password');
        res.redirect('updateProfile')
      }
      if(new_password_conf!==new_password){
        req.flash('error', 'passwords do not match');
        res.redirect('updateProfile')
      }
    }
    

  }else{
    req.flash('error', 'Login to continue');
    res.redirect('/login');
  }
})


module.exports = route;