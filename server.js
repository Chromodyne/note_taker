//Imports
const fs = require("fs");
const path = require("path");
const express = require("express");
const uniqid = require("uniqid");
const db = require("./db/db.json");
const { nextTick } = require("process");

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

    //Give feedback both in server console and through API console.
    //res.json(`Server received ${req.method} request for saving a note.`);
    console.log(`Client successfully sent ${req.method} request for saving a note.`);

    //Destructure request body to use keys.
    const { title, text } = req.body;
    
    //Generates a unique id for the object to be placed in the JSON.
    const id = uniqid();

    //Check if the request has both title and text keys.
    if (title && text) {

        const newNote = {
            title,
            text,
            id      //Generated above. Does NOT come from index.js
        }

        //Read the db.json file to parse the old data.
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

        //NOTE: For some reason the list on the left will not update until the server is 
        //restarted.  Everything seems correct in the index.js
        //Apparently the routing might need to be promisified but I have had little luck
        //implementing it.
        res.status(201);

    }

});

//OPTIONAL TODO: Use this to handle deleting of notes. Get id parameter for functionality.
app.delete("/api/notes/:id", (req, res) => {
    const elToDelete = req.params.id;

});

//Have express server begin listening on defined port.
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

