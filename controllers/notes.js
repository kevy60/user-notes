const Note = require('../models/note');

exports.addNote = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.session.user.user_id; 

    Note.create({
        title: title,
        content: content,
        userId: userId
    })
    .then(result => {
        res.status(201).json({ message: 'Note created successfully', note: result });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Creating the note failed.' });
    });
};


exports.getUserNotes = (req, res, next) => {
    const userId = req.session.user.user_id; 

    Note.findAll({ where: { userId: userId } })
    .then(notes => {
        res.status(200).json({ notes: notes });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Fetching notes failed.' });
    });
};
