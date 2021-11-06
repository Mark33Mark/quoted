
const express   = require( "express" );
const path      = require( "path" );
const app       = express();

// server connection
const PORT = process.env.PORT || 8888;

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// middleware to render the page elements - css, images, etc.
app.use( express.static( "public" ) );

// GET Route for homepage
app.get( "/", ( req, res ) =>
    res.sendFile( path.join( __dirname, "/public/quotes/random/index.html" ))
);

// Wildcard to direct all undefined end points back to the homepage
// app.get('*', (req, res) =>
//     res.sendFile( path.join(__dirname, "/public/index.html" ))
// );

require("./routes/quotes.routes.js")(app);

app.listen(PORT, () =>
    console.log(`App listening at: http://localhost:${PORT} 🦻`)
);
