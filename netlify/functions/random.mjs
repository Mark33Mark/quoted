import connection from './utils/connection.js';

const sql_query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
const sql_count_database_length =
	'SELECT (SELECT COUNT(1) FROM quotes) AS database_length';

// using current functions API syntax: 
// https://www.netlify.com/blog/introducing-netlify-functions-2-0

export default async (request) => {
	const clientMessage = await request.json();

	try {
		const connected = await connection.getConnection();
		const results = await connected.execute(sql_query);
		const counter = await connected.execute(sql_count_database_length);

		const mergedObject = {
			...clientMessage,
			...results[0][0],
			...counter[0][0],
		};
		console.log('Quote of the day: ', mergedObject);

		return new Response(JSON.stringify(mergedObject));

	} catch (error) {
		console.log(
			'There is a problem communicating with the Quotes database:\n',
			error
		);
	}
};
