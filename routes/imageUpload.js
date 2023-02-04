 const express= require('express');
 const route = express.Router();
 const connection = require('../models/db_config');     
 const multer = require('multer');
const { render } = require('ejs');

route.get('/upload', (req, res)=>{
    res.render('imageUpload')
});

route.post('/upload', (req, res)=>{
    if(req.session.loggedin) {
        const storeImage =(inputValues,callback)=>{
        const username = req.session.username;
        const query = `SELECT * FROM user_table WHERE username = "${username}"`;
        connection.query(query, (err, data)=>{
          
    

        })


        } 
 
    }
    else{
        
    }
})
 
 module.exports = route;