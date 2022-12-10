const mysql = require( "mysql2" );
const { randomQuote } = require("../../models/quotes.model");
// require('dotenv').config();

// Create a connection to the database
const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const sql_query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

exports.handler = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  try {

    connection.getConnection(function(err, connected) {

      connected.execute( sql_query, (error, results) => {

      if (error){ 
        console.log('calling callback with error')
        callback(error);
      } else {

        console.log("Quote of the day: ", results[0]);

        callback( null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(results[0])
          // body: JSON.stringify({quote: "Why isn't this working?", author: "Mark Watson"})
        })
      }
    })
    console.log('error = ', err);
  })
} catch (e) {
    console.log('There is an error in communicating with the Quotes database: ', e);
  }
}
