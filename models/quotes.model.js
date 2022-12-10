const sql = require( "./db.js" );

// constructor
const Quotes = function( quotes ) {
    this.quote = quotes.quote;
    this.author = quotes.author;
};

// create a new quote
Quotes.create = (newQuote, result) => {
    sql.query("INSERT INTO quotes SET ?", newQuote, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }

    console.log("created quote: ", { id: res.insertId, ...newQuote });
    result(null, { id: res.insertId, ...newQuote });
    });
};

// find a Quote
Quotes.findById = (quoteId, result) => {
  sql.query(`SELECT * FROM quotes WHERE id = ${quoteId}`, (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        console.log("Found quote: ", res[0]);
        result(null, res[0]);
        return;
    }

    // couldn't find Quote with the id
    result({ kind: "not_found" }, null);
    console.log(`\nQuote not found: The requested quote id: ${quoteId} does not exist.`);
    });
};

// get all Quotes
Quotes.getAll = result => {
  sql.query("SELECT * FROM quotes", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log("All quotes found.");
    result(null, res);
    });
};

// random quote
Quotes.randomQuote = result => {
    sql.query("SELECT * FROM quotes ORDER BY RAND() LIMIT 1", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    console.log("Quote of the day: ", res);
    result(null, res);
    });
};

// update a quote using it's ID
Quotes.updateById = (id, quotes, result) => {
    sql.query(
    "UPDATE quotes SET quote = ?, author = ? WHERE id = ?",
    [quotes.quote, quotes.author, id],
    (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        console.log(`\nQuote not found: The requested quote id: ${id} does not exist.`);
        return;
        }

        console.log("updated quote: ", { id: id, ...quotes });
        result(null, { id: id, ...quotes });
        }
    );
};


// Delete a quote.
Quotes.remove = (id, result) => {
    sql.query("DELETE FROM quotes WHERE id = ?", id, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
        result({ kind: "not_found" }, null);
        console.log(`\nQuote not found: The requested quote id: ${id} does not exist.`);
        return;
    }

    console.log("deleted quote with id: ", id);
    result(null, res);
    });
};

// Delete all quotes.
Quotes.removeAll = result => {
    sql.query("DELETE FROM quotes", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log(`deleted ${res.affectedRows} quotes... goodbye  👋`);
    result(null, res);
    });
};

module.exports = Quotes;