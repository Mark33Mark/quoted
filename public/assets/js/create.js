const form = document.getElementById('quotes__create');
const quote = form.elements['quotes__textcontainer'];
const author = form.elements['quotes__author'];

const alert_close = document.getElementById('alert_close_button');

alert_close.addEventListener('click', (event) => {
	event.preventDefault();
  event.stopPropagation();
	if (alert_close.parentElement.style.display === 'none') {
		alert_close.parentElement.style.opacity = '1';
		setTimeout(function () {
			alert_close.parentElement.style.display = 'block';
		}, 1000);
	} else {
		alert_close.parentElement.style.opacity = '0';
		setTimeout(function () {
			alert_close.parentElement.style.display = 'none';
		}, 1000);
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
  event.stopPropagation();
  
	const text = quote.value;
	const regex_pattern = /([a-zA-Z]{1,})+\s+([a-zA-Z]{1,})+[a-zA-Z\s]*/;
	const more_than_one_word = regex_pattern.test(text);

	console.log(regex_pattern.test(text));

	let alert_message = ' ';
	alert_message += `<br /> === Invalid === <br />`;
	alert_message +=
		"<br /> A quote with more than one word is required with the author's name. <br /><br />";

	if (quote.value === '' || author.value === '' || !more_than_one_word) {
		alert_close.nextElementSibling.innerHTML = alert_message;

		alert_close.parentElement.style.display = 'block';
    alert_close.parentElement.style.opacity = '1';

		setTimeout(function () {
			alert_close.parentElement.style.display = 'none';
      alert_close.parentElement.style.opacity = '0';
		}, 10000);
	} else {
		checkQuoteExists(quote.value);
	}
});

const checkQuoteExists = async (users_quote) => {
	await fetch('.netlify/functions/exists', {
		method: 'POST',
		body: JSON.stringify({ user_quote: users_quote }),
	})
		.then((response) => response.json())
		.then((data) => {
      const [[dataFetched]] = data;

			if ( !dataFetched ) {
				console.log('The quote is not in the database, add it?');
				if (
					confirm(
						"Proceed with adding: \n\n quote: '" +
							quote.value +
							"' \n author: '" +
							author.value +
							"'\n ?"
					)
				) {
					fetch('.netlify/functions/create', {
						method: 'POST',
						body: JSON.stringify({ quote: quote.value, author: author.value }),
					})
						.then((response) => response.json())
						.then((data) => {
							if (data[0].insertId) {
								// console.log('data = ', data);
								alert(
									'Congratulations, the quote has been added with id: \n' +
										data[0].insertId
								);
								quote.value = '';
								author.value = '';
							} else {
								alert(
									'There was a problem adding the quote into the database, either try again or contact the administrator.'
								);
							}
						});
				} else {
					return;
				}
			} else {

				alert(
					'Please enter a new quote as your quote already exists in the database: \n\n id: ' +
          dataFetched.id +
						'\n quote: ' +
						dataFetched.quote +
						'\n author: ' +
						dataFetched.author
				);
			}
			// console.log(dataFetched);
		});
};
