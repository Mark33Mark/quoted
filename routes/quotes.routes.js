
module.exports = app => {
    const quotes = require("../controllers/quote.controller.js");

    // Create a new Quote
    app.post("/quotes", quotes.create);

    // Retrieve all quotes
    app.get("/quotes", quotes.findAll);

    // Return a random new Quote
    app.get("/quotes/random", quotes.randomOne);

    // Retrieve a single quote with quoteId
    app.get("/quotes/:quoteId", quotes.findOne);

    // Update a quote with quoteId
    app.put("/quotes/:quoteId", quotes.update);

    // Delete a Quoe with quoteId
    app.delete("/quotes/:quoteId", quotes.delete);

    // Create a new quote
    app.delete("/quotes", quotes.deleteAll);
};