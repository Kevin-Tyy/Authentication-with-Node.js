const express = require('express');
const route = express.Router(); 
const connection = require('../models/db_config');
const flash = require('express-flash');




route.get('/authentication', (req, res)=>{
    if(req.session.loggedin==true){
        res.render('authentication');
    }else{
        req.flash('error', 'login to continue');
        res.redirect('/login');
    }
})
route.post('/authentication', (req, res)=>{
    if(req.session.loggedin== true){
        const username = req.session.username;
        const password = req.body.password;
        const query = `SELECT * FROM user_tabLE WHERE username = "${username}";`;
        if(password!==""){
            connection.query(query, (err, data)=>{
                if (err){
                    throw err.message
                }
                else{
                    if(data.length> 0){
                        for(let i =0; i< data.length; i++){
                            if(data[i].password == password){
                                res.redirect('updateProfile');
                            }else{
                                req.flash('error', 'Incorrect password');
                                res.redirect('authentication');
                            }
                        }
                    }
                }
            })

        }else{
            req.flash('error', 'Please enter a password');
            res.redirect('authentication')
        }
    }else{
        req.flash('error', 'Login to continue');
        res.redirect('login');
    } 

})  
  

module.exports = route;