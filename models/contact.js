const mongoose = require("mongoose"); // Importing the mongoose module

// Defining the schema for the Contact model
const contactSchema = new mongoose.Schema({
    name: {
        type: String, // Name should be a string
        required: true // Name is a required field
    },
    phone: {
        type: String, // Phone should be a string
        required: true // Phone is a required field
    }
});

// Creating the Contact model using the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact; // Exporting the Contact model
