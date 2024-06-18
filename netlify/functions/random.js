const connection = require('./utils/db_connection.js');

const sql_query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
const sql_count_database_length =
	'SELECT (SELECT COUNT(1) FROM quotes) AS database_length';

exports.handler = async (event) => {
	
	let mergedObject;
	const clientMessage = JSON.parse(event.body);

	try {
		const connected = await connection.getConnection();
		const results = await connected.execute(sql_query);
		const counter = await connected.execute(sql_count_database_length);

		mergedObject = {
			...clientMessage,
			...results[0][0],
			...counter[0][0],
		};
		console.log('Quote of the day: ', mergedObject);
	} catch (error) {
		console.log(
			'There is a problem communicating with the Quotes database:\n',
			error
		);
	}
	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(mergedObject),
	};
};
