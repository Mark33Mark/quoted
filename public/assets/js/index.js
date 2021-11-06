
const dailyQuote = document.getElementById( "daily-quote" );
const anotherQuoteBtn = document.getElementById( "quote-button" );

const getQuote = () => {
  fetch( "/quotes/random" )
  .then( response =>  {
    if ( response.ok ) {
      response
        .json()
          .then( data => {
            
            let theQuote = JSON.stringify( data[0].quote ); 
            let theAuthor = JSON.stringify( data[0].author ); 
            
            // the stringify of the object has quotes, using regex to remove them.
            newAuthor = theAuthor.replace(/"/g, "");
            
            dailyQuote.innerText = ` ${theQuote} \n- ${newAuthor}`;
          });
      }
    });
};

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

anotherQuoteBtn.addEventListener('click', getQuote);

getQuote();
