const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Setting up the HTML routes

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/notes", function(req, res){
    res.sendFile(__dirname + "/public/notes.html")
});


//Setting up the API routes

//Set up the notes variable
//* GET `/api/notes` - Reads the `db.json` file and return all saved notes as JSON.
fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
    console.log(notes)

    //Sets up the /api/notes get route
    app.get("/api/notes", function(req, res){
    res.json(notes);
    });
});

//POST /api/notes save on the request body, add it to the `db.json` file, and then return the new note to the client.

app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    //Get the value of the last id if it exists
    let lastId;
    if(notes.length){
        lastId = Math.max(...(noteList.map(note => note.id)));
    } else {
        lastId = 0;
        }

    console.log(lastId);
    //Starts the id's at 1
    const id = lastId + 1;

    // pushes the id of the note along with the rest of the text/input of the array in the request.body
    notes.push({ id, ...req.body });
    //Removes last index
    res.json(noteList.slice(-1));
    });





app.listen(PORT, function(){
    console.log("You've been served!");
})