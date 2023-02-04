const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node.js'
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connection to Mysql DB successful");
    }
});

module.exports = connection;