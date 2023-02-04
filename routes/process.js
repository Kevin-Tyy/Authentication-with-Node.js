const express = require('express');
const route = express.Router();
const connection = require('../models/db_config');

route.post('/process', (req , res)=>{
    if(req.session.loggedin== true){
        res.redirect('authentication');
    }
});



  module.exports = route;