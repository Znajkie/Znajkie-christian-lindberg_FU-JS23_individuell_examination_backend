const moment = require('moment');
const Note = require('../models/Note');
const notesDb = require('../models/notesModel');

const postNote = (req, res) => {
  const userId = req.userId;
  console.log(userId); // undefined
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

// GET request
const getNote = (req, res) => {
  const userId = req.userId; // Access userId from the request object

  // Fetch notes for the logged-in user
  notesDb.find({ userId: userId }, (err, notes) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching notes' });
    } else {
      res.json(notes);
    }
  });
};

// DELETE request
const deleteNote = (req, res) => {
  const noteId = req.params.id;

  // Delete the note from the database
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
const searchNotes = (req, res) => {
  const searchTerm = req.query.q;
  notesDb.find(
    {
      $or: [
        { title: new RegExp(searchTerm, 'i') },
        { text: new RegExp(searchTerm, 'i') },
      ],
    },
    (err, foundNotes) => {
      if (err) {
        res.status(500).json({ error: 'Error searching notes' });
      } else {
        res.json(foundNotes);
      }
    }
  );
};

module.exports = {
  postNote,
  putNote,
  getNote,
  deleteNote,
  searchNotes,
};
