
const dailyQuote = document.getElementById( "daily-quote" );
const anotherQuoteBtn = document.getElementById( "quote-button" );

const getQuote = () => {
  axios.get( ".netlify/functions/random" )

  .then( response =>  {
    if ( response.statusText='OK' ) {
                    
          const data = response.data;
          console.log(data);

          let theQuote = JSON.stringify( data.quote ); 
          let theAuthor = JSON.stringify( data.author ); 
          
          // the stringify of the object has quotes, using regex to remove them.
          newAuthor = theAuthor.replace(/"/g, "");
          
          dailyQuote.innerText = ` ${theQuote} \n- ${newAuthor}`;
        }
      });

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
