const db_connect = require( "./utils/db_connection.js" );

const sql_query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";
const sql_count_database_length = "SELECT (SELECT COUNT(1) FROM quotes) AS database_length";

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

        // as connection is available, run 2nd query to get number of quotes available
        connected.execute( sql_count_database_length, ( error, counter) => {
        
        const mergedObject = { ...clientMessage, ...results[0], ...counter[0]};
        console.log("Quote of the day: ", mergedObject);

          callback( null, {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(mergedObject)
            })
          })
        }
      })

    if(err) { console.log('db_connect error = ', err); }

  })
} catch (e) {
    console.log('There is a problem communicating with the Quotes database: ', e);
  }
}
