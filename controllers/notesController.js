const moment = require('moment');
const Note = require('../models/Note');
const notesDb = require('../models/notesModel');


// POST request 
const postNote = (req, res) => {
    const userId = req.userId;
    const { id, title, text } = req.body;
    const createdAt = moment().toDate();
    const modifiedAt = createdAt;
    const newNote = new Note(userId, id, title, text, createdAt, modifiedAt);

    notesDb.insert(newNote, (err, insertedNote) => {
      if (err) {
        res.status(500).json({ error: 'Error creating note' });
      } else {
        res.status(201).json(insertedNote);
      }
    });
};

// PUT request
const putNote = (req, res) => {
  const noteId = req.params.id;
  const { title, text } = req.body;
  const modifiedAt = moment().toDate();

  notesDb.update(
    { _id: noteId },
    { $set: { title, text, modifiedAt } },
    {},
    (err, numAffected) => {
      if (err) {
        res.status(500).json({ error: 'Error updating note' });
      } else if (numAffected === 0) {
        res.status(404).json({ error: 'Note not found' });
      } else {
        res.status(200).json({ message: 'Note updated successfully' });
      }
    }
  );
};

// GET all notes in the DB
const getAllNotes = async (req, res) => {
  try {
    const docs = await notesDb.find({});
    res.status(200).json({ success: true, menu: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

// DELETE request
const deleteNote = (req, res) => {
  const noteId = req.params.id;

  notesDb.remove({ _id: noteId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error deleting note:', err);
      res.status(500).json({ error: 'Error deleting note' });
    } else if (numRemoved === 0) {
      console.error('Note not found:', noteId);
      res.status(404).json({ error: 'Note not found' });
    } else {
      console.log('Note deleted successfully:', noteId);
      res.status(200).json({ message: 'Note deleted successfully' });
    }
  });
};

// GET Search for a note with the title
const searchNote = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const foundNotes = await notesDb.find({
      title: new RegExp(searchTerm, 'i'),
    });
    res.status(200).json(foundNotes);
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ error: 'Error searching notes' });
  }
};


module.exports = {
  postNote,
  putNote,
  getAllNotes,
  deleteNote,
  searchNote,
};
