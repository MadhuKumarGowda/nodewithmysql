const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: process.env.dbport,
    password: process.env.password,
    database: process.env.database
})

connection.connect((err)=>{
    if(!err){
        console.log("db connected");
    }else{
        console.log("db is not connected", err);
        throw err;
    }
})

module.exports = connection;
