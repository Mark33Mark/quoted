
const mysql     = require( "mysql2" );
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



// const dbConfig  = require( "../config/db.config.js" );

// Create a connection to the database
// let connection = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DATABASE
// });

// // open the MySQL connection
// connection.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the quotes database.  😄");
// });

module.exports = connection;