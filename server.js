const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 8080;
//this allows the use of the CSS and Js files
app.use(express.static('public'));

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

//Set up the noteList variable
//* GET `/api/notes` - Reads the `db.json` file and returns all saved notes as JSON.
let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
// console.log(noteList)

//Sets up the /api/notes get route - displays the saved notes
app.get("/api/notes", function(req, res) {res.json(noteList)} );

//POST /api/notes save on the request body, adds it to the `db.json` file, and then return the new notes to the client.
app.post('/api/notes', (req, res) => {

    // req.body hosts is equal to the JSON post sent from the user, storing its value in a variable
    const newNote = req.body;
    //Assigning a unique ID to the note to allow for call back
    unqiueID();
    // console.log(newNote)

    noteList.push(newNote); //add the note data to the note list

        //Append new note to the json file
    fs.writeFile('db/db.json', JSON.stringify(noteList), 'utf8', function(err){
        if (err) throw err;
        res.json(newNote);
        });
    });

    const unqiueID = () => {
        for (i = 0; i < noteList.length; i++) {
            noteList[i].id = i + 1;
            // console.log(noteList[i])
        }
    };


//`DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. 
// Displays a single character, or returns false
app.delete('/api/notes/:id', (req, res) => {
    //filter out the note with the id clicked
    notes = noteList.filter(n => n.id != req.params.id)
    // console.log(notes)

    //rewrite the json file with the note with that particular id removed
    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
       if (err) throw err; 
       res.json(notes);

    });
  });


app.listen(PORT, function(){
    console.log("You've been served!");
})