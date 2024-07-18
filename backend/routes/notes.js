const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// Create Note
router.post('/', auth, async (req, res) => {
    const { title, content, tags, color, reminder } = req.body;
    try {
        const newNote = new Note({
            userId: req.user.id,
            title,
            content,
            tags,
            color,
            reminder,
        });
        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all notes
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, deletedAt: null }).sort({ date: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get archived notes
router.get('/archived', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, archived: true });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get notes by tag
router.get('/tag/:tag', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, tags: req.params.tag });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Note (soft delete)
router.delete('/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        note.deletedAt = Date.now();
        await note.save();
        res.json({ msg: 'Note deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
