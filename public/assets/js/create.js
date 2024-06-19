
const form = document.getElementById('create_a_quote');
const quote = form.elements['quote'];
const author = form.elements['author'];

const alert_close = document.getElementById('alert_close_button');


alert_close.addEventListener('click', (event) => {
  event.preventDefault();
  if (alert_close.parentElement.style.display === "none") {
    
    alert_close.parentElement.style.opacity = "1";
    setTimeout(function(){ alert_close.parentElement.style.display = "block"; }, 800);
  } else {
    alert_close.parentElement.style.opacity = "0";
    setTimeout(function(){ alert_close.parentElement.style.display = "none"; }, 600);
  }
})


form.addEventListener('submit', (event) => {

  event.preventDefault();

const text = quote.value;
const regex_pattern = /([a-zA-Z]{1,})+\s+([a-zA-Z]{1,})+[a-zA-Z\s]*/;
const more_than_one_word = regex_pattern.test(text);

console.log( regex_pattern.test(text) );

let alert_message = " ";
  alert_message += "Invalid entry";
  alert_message += "<br /> A quote with more than one word is required with the author's name. <br />";
  alert_message += " ";

  if (quote.value === '' || author.value === '' || !more_than_one_word ) {
      
    alert_close.nextElementSibling.innerHTML = alert_message;
    
    alert_close.parentElement.style.display = "block";
    
    setTimeout(function(){ alert_close.parentElement.style.display = "none"; }, 4000);
    
  } else {
  
    checkQuoteExists(quote.value);

  }
});

const checkQuoteExists = async (users_quote) => {
  
  await fetch( ".netlify/functions/exists", {
      method: 'POST',
      body: JSON.stringify({user_quote: users_quote})
  })

  .then( response => response.json())
  .then( data =>  {

          if( !data[0][0] ) { 
            console.log("The quote is not in the database, add it?")
            if ( confirm("Proceed with adding: \n\n quote: \'" + quote.value + "\' \n author: \'" + author.value + "\'\n ?") ) {
              
              fetch( ".netlify/functions/create", {
                method: 'POST',
                body: JSON.stringify({quote: quote.value, author: author.value})
            })
          
            .then( response => response.json())
            .then( data =>  {
              if(data[0].insertId) {
              console.log('data = ', data);
              alert("Congratulations, the quote has been added with id: \n" + data[0].insertId);
              quote.value = " ";
              author.value = " ";
              } else {
                alert("There was a problem adding the quote into the database, either try again or contact the administrator.");
              }
            
            })
            } else {
              return;
            }

          } else {

            alert("Please enter a new quote as your quote already exists in the database: \n\n id: " + data[0][0].id + "\n quote: " + data[0][0].quote + "\n author: " + data[0][0].author )
          } ;
          console.log(data[0][0]);
        }
      )
    }


