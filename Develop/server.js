const express = require('express');
const app = express ();
const fs = require ("fs");
const path = require ("path");
const notes = require ("./db/db.json");
const uuid = require ("uuid");
var PORT = process.env. PORT || 3001;


// set the middleware

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// set up routes for API to get saved notes and joins them in db.json

app.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// add new notes to db.json with POST function:
app.post("/api/notes", (req,res) => {
const notes = JSON.parse(fs.readFileSync("./db/db.json"));
const newNotes = req.body;
newNotes.id = uuid.v4();
notes.push(newNotes);
fs.writeFileSync("./db/db.json", JSON.stringify(notes))
res.json(notes);
});

//delete notes in db.json with DELETE function:

app.delete("/api/notes"/:id, (req, res) =>{
const notes =JSON.parse(fs.readFileSync("./db/db.json"));
const deleteNote = notes.filter((rmvNote) => rmvNote.id !==req.params.id);
fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
res.json(deleteNote);
});

// calls (index.html)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// calls (notes.html)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// makes server listen to PORT

app.listen(PORT, function () {
    console.log(`App server on PORT 3001!`);
});


