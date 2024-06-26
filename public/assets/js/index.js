
const dailyQuote = document.getElementById( "quotes__selected" );
const dailyQuoteID = document.getElementById( "quotes__selectedId" );
const anotherQuoteBtn = document.getElementById( "button__randomQuote" );
const data = { quotes_randomiser: 'A quote randomly selected from watsonised\'s sql server.' }

const getQuote = async () => {
  anotherQuoteBtn.classList.add('button__loading');
  
  
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

          anotherQuoteBtn.classList.remove('button__loading');
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
