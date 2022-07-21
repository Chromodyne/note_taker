//Imports
const fs = require("fs");
const path = require("path");
const express = require("express");

//Setup which port to use. If local use 3001.
const PORT = process.env.PORT || 3001;

//Express variable.
const app = express();

//Configure middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//TODO: Add routing.



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});