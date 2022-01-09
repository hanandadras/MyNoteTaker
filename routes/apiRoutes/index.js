const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// gets notes from 

router.get('/notes', (req, res) => {
const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    res.json(notes);
  });

// add new notes to db.json with POST function:

router.post("/notes", (req,res) => {
const notes = JSON.parse(fs.readFileSync("./db/db.json"));
const newNotes = req.body;
newNotes.id = uuidv4();
notes.push(newNotes);
fs.writeFileSync("./db/db.json", JSON.stringify(notes))
res.json(notes);
});

//delete notes in db.json with DELETE function:

router.delete("/notes/:id", (req, res) =>{
const notes =JSON.parse(fs.readFileSync("./db/db.json"));
const deleteNote = notes.filter((rmvNote) => rmvNote.id !==req.params.id);
fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
res.json(deleteNote);
});

module.exports = router;
