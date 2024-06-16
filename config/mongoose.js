const mongoose = require("mongoose"); // Importing the mongoose module

// Connecting to the MongoDB database
mongoose.connect("mongodb://localhost/contactList")
.then(() => {
    console.log("success mongodb connection"); // Log a message on successful connection
})
.catch((err) => {
    console.log(err); // Log any connection errors to the console
});
