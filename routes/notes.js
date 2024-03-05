const express = require('express');
const notes = require('../controllers/notes');


const router = express.Router();

router.post('/add-note', notes.addNote);
router.get('/user-notes', notes.getUserNotes);

module.exports = router;