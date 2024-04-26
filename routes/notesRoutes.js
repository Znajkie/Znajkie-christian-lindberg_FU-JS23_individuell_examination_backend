const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.post("/", notesController.postNote);

router.get("/:id", notesController.getNote);

router.put("/:id", notesController.putNote);

router.delete("/:id", notesController.deleteNote);

router.get("/search", notesController.searchNotes);

module.exports = router;

