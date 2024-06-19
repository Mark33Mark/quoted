const db_connect = require( "./utils/connection.js" );
const sql_query = "SELECT * FROM `quotes` WHERE `quote` LIKE ?";

/* 
% matches any number of characters, even zero characters.
'***%' for when we want the string to start with a specific text, we add the % operator only at the end.
_ matches exactly one character.
*/


exports.handler = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  
  const clientMessage = JSON.parse(event.body);
  const preparedSearchCriteria = [ clientMessage.user_quote + '%'];

  try {

    db_connect.getConnection(function(err, connected) {

      connected.execute( sql_query,  preparedSearchCriteria, ( error, result) => {

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

