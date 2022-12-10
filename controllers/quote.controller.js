

const Quote = require("../models/quotes.model.js");

// Create and Save a new Quote
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Quote
    const quote = new Quote({
        quote: req.body.quote,
        author: req.body.author
    });

    // Save Quote in the database
    Quote.create(quote, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the quote."
        });
        else res.send(data);
    });
};

// Retrieve all Quotes from the database.
exports.findAll = (req, res) => {
    Quote.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving quotes."
        });
        else res.send(data);
    });
};

// Retrieve a Random Quote from the database.
exports.randomOne =  (req, res) => {
    Quote.randomQuote((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving a random quote."
        });
        else res.send( data );
    });
};

// Find a single Quote with a QuoteId
exports.findOne = (req, res) => {
    Quote.findById(req.params.quoteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Sorry, I can't find a quote with id ${req.params.quoteId}.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving Quote with id " + req.params.quoteId
                });
            }
            } else res.send(data);
        });
};

// Update a Quote identified by the QuoteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Quote.updateById(
        req.params.quoteId,
        new Quote(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Sorry, I can't find a quote with id ${req.params.quoteId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Quote with id " + req.params.quoteId
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Quote with the specified QuoteId in the request
exports.delete = (req, res) => {
    Quote.remove(req.params.quoteId, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Sorry, I can't find a quote with id ${req.params.quoteId}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Quote with id " + req.params.quoteId
            });
        }
        } else res.send({ message: `quote was deleted successfully!` });
    });
};

// Delete all Quotes from the database.
exports.deleteAll = (req, res) => {
    Quote.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all quotes."
        });
        else res.send({ message: `All quotes were deleted successfully!` });
    });
};