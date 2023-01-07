
const dailyQuote = document.getElementById( "daily-quote" );
const dailyQuoteID = document.getElementById( "quote-id" );
const anotherQuoteBtn = document.getElementById( "quote-button" );
const data = { quotes_randomiser: 'A quote randomly selected from watsonised\'s sql server.' }

const getQuote = async () => {
  
  await fetch( ".netlify/functions/random", {
      method: 'POST',
      body: JSON.stringify(data)
  })

  .then( response => response.json())
  .then( data =>  {

          console.log(data);

          let theQuote = JSON.stringify( data.quote ); 
          let theAuthor = JSON.stringify( data.author ); 
          
          // the stringify of the object has quotes, using regex to remove them.
          newAuthor = theAuthor.replace(/"/g, "");
          
          dailyQuote.innerText = ` ${theQuote} \n- ${newAuthor}`;
          dailyQuoteID.innerText = `quote ref: quote ${data.id} from ${data.database_length} quotes.`;
        }
      )
    }

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

anotherQuoteBtn.addEventListener('click', getQuote);

getQuote();
