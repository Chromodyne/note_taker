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

//Listens for a post request for saving notes before 
app.post("/api/notes", (req, res) => {

    //TODO: We need to get the information passed in from the body and then write it to the db.json
    //before we return a response.

    res.json(`Server received ${req.method} request for saving a note.`);
    console.log(`Client successfully sent ${req.method} request for saving a note.`);

    //Destructure request body to use keys.
    const { title, text } = req.body;

    //Check if the request has both title and text keys.
    if (title && text) {

        const newNote = {
            title,
            text
        }

        //Read the the db.json file to parse the old data.
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parseOldNotes = JSON.parse(data);
                parseOldNotes.push(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(parseOldNotes, null, 2), (showError) => {
                    if (showError) {
                        console.error(showError);
                    } 
                })
            }
        });

    } else {

    }
    
});

//Have express server begin listening on defined port.
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

