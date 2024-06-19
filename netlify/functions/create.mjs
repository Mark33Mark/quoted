import connection from './utils/connection.js';

export default async (request) => {
	let sql_query = 'INSERT INTO quotes(quote, author) VALUES ';

	const clientMessage = await request.json();
	console.log(clientMessage);

	let query_parameters =
		'( "' + clientMessage.quote + ' " , "' + clientMessage.author + '" )';

	sql_query += query_parameters;

	console.log('sql_query = ', sql_query);

	try {
		const connected = await connection.getConnection();
		const results = await connected.execute(sql_query);

		if (results.length === 0) {
			console.log('quote not in database, add it?');
		}

		console.log(results);

		return new Response(JSON.stringify(results));
	} catch (error) {
		console.log(
			'There is a problem communicating with the Quotes database: \n',
			error
		);
	}
};
