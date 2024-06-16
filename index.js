const express = require("express"); // Importing the express module
// const ejs = require("ejs"); // Importing the ejs module (commented out because it's not needed here)
const path = require("path"); // Importing the path module for handling and transforming file paths

const db = require("./config/mongoose"); // Importing the mongoose configuration file to connect to MongoDB
const Contact = require("./models/contact"); // Importing the Contact model

const app = express(); // Initializing the express app

app.set("view engine", "ejs"); // Setting EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Setting the directory for views

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static("assets")); // Middleware to serve static files from the "assets" directory

// Route to fetch and display contacts
app.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from the database
        res.render("index", { title: "Contact List", list: contacts }); // Render the index view with the fetched contacts
    } catch (error) {
        console.error("Error fetching contacts", error); // Log any errors to the console
        res.status(500).send("Internal Server Error"); // Send a 500 error response if something goes wrong
    }
});

// Route to create a new contact
app.post("/create-contact", async (req, res) => {
    try {
        const contactData = await Contact(req.body); // Create a new Contact instance with the request body data
        if (!contactData.name || !contactData.phone) {
            return res.send(`
                <html>
                  <body>
                    <script>
                      alert('Plese enter name and phone number');
                      window.history.back(); // Go back to the previous page
                    </script>
                  </body>
                </html>
              `);
        }
        console.log(req.body); // Log the request body to the console
        console.log(contactData); // Log the contact data to the console
        await contactData.save(); // Save the new contact to the database
        res.redirect("back"); // Redirect back to the previous page
    } catch (error) {
        res.status(500).send("Internal Server Error"); // Send a 500 error response if something goes wrong
    }
});

// Route to delete a contact by ID
app.get("/delete-contact/:id", async (req, res) => {
    try {
        const contactId = req.params.id; // Get the contact ID from the request parameters
        console.log(contactId); // Log the contact ID to the console
        await Contact.findByIdAndDelete(contactId); // Find and delete the contact by ID
        res.redirect("back"); // Redirect back to the previous page
    } catch (error) {
        console.error("Error deleting contact", error); // Log any errors to the console
        res.status(500).send("Internal Server Error"); // Send a 500 error response if something goes wrong
    }
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log("running 5000"); // Log a message to indicate the server is running
});
