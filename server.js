//Imports
const fs = require("fs");
const path = require("path");
const express = require("express");
const db = require("./db/db.json")

//Setup which port to use. If local use 3001.
const PORT = process.env.PORT || 3001;

//Express variable.
const app = express();

//Configure middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//TODO: Add modular routing using notes.js in ./routes

//Get the notes.html when requested.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});

//Retrieves the notes stored in db.json
app.get("/api/notes", (req, res) => {
    return res.status(200).json(db);
});

//TODO: Save note routing.
app.post("/api/notes", (req, res) => {

    //TODO: We need to get the information passed in from the body and then write it to the db.json
    //before we return a response.

    res.json(`Server received ${req.method} request for saving a note.`);
    console.log(`Client successfully sent ${req.method} request for saving a note.`);

    //DEBUGGING
    console.log(req.body);

    //Destructure request body to use keys.
    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text
        }

        //TODO: Maybe change this to not be imported if doesn't work.
        fs.readFile(db, "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                
            }
        })

    } else {

    }
    

});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});