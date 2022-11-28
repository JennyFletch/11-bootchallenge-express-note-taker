const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving data
notes.get('/', (req, res) => {
  console.info(`${req.method} request received to update notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to update notes`);





  // Destructuring assignment for the items in req.body
  //const { title, text } = req.body;

  var data = req.body;
  var title = data.title;
  var text = data.text;

  console.log(typeof req.body);

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

module.exports = notes;
