const express = require('express');
const route = express.Router();

route.get('/logout', (res, req)=>{
  
})
route.post('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/login');
})

module.exports  = route;