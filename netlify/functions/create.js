const db_connect = require( "./utils/connection.js" );

exports.handler = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  let sql_query = "INSERT INTO quotes(quote, author) VALUES ";
  
  const clientMessage = JSON.parse(event.body);
  console.log(clientMessage);

  let query_parameters = "( \"" + clientMessage.quote + " \" , \"" + clientMessage.author + "\" )"
  
  sql_query += query_parameters;

  console.log("sql_query = ", sql_query);
  
  try {

    db_connect.getConnection(function(err, connected) {

      connected.execute( sql_query, ( error, result) => {

      if (error){ 

        console.log('calling callback with error')
        callback(error);

      } else {

        if(result.length === 0){
          console.log("quote not in database, add it?");
          }
        
        console.log(result)

          callback( null, {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(result)
            })
        }
      })

    if(err) { console.log('db_connect error = ', err); }

  })
} catch (e) {
    console.log('There is a problem communicating with the Quotes database: ', e);
  }
}
