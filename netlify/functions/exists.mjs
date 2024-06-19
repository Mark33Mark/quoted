import connection from './utils/connection.js';

const sql_query = 'SELECT * FROM `quotes` WHERE `quote` LIKE ?';

/* 
% matches any number of characters, even zero characters.
'***%' for when we want the string to start with a specific text, we add the % operator only at the end.
_ matches exactly one character.
*/

export default async (request) => {
	const clientMessage = await request.json();
	const preparedSearchCriteria = [clientMessage.user_quote + '%'];

	try {
		const connected = await connection.getConnection();
		const results = await connected.execute(sql_query, preparedSearchCriteria);

		if (results.length === 0) {
			console.log('quote not in database, add it?');
		}

		return new Response(JSON.stringify(results));

	} catch (error) {
		console.log(
			'There is a problem communicating with the Quotes database: \n',
			error
		);
	}
};
