const db_connect = require( "./utils/db_connection.js" );
const sql_query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

exports.handler = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  const clientMessage = JSON.parse(event.body);

  try {

    db_connect.getConnection(function(err, connected) {

      connected.execute( sql_query, (error, results) => {

      if (error){ 

        console.log('calling callback with error')
        callback(error);

      } else {
        
        const mergedObject = { ...clientMessage, ...results[0]};
        console.log("Quote of the day: ", mergedObject);

        callback( null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(results[0])
        })
      }
    })

    if(err) { console.log('db_connect error = ', err); }

  })
} catch (e) {
    console.log('There is an error in communicating with the Quotes database: ', e);
  }
}
