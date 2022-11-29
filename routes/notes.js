const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving old notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received to update notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting new notes
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to update notes`);

  var data = req.body;
  var title = data.title;
  var text = data.text;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

// DELETE Route for deleting notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);

    // Get the id of the note to delete
    const noteId = req.params.id;

    readFromFile('./db/db.json').then((data) => {

        let parsedData = JSON.parse(data);

        // Remove the note requested for deletion
        let filtered = parsedData.filter(item => item.note_id !== noteId);
        
        // Pass along the new data for writing to file
        return filtered;

    }).then(response => {
        writeToFile('./db/db.json', response);
        res.json(response);
    });
});

module.exports = notes;
