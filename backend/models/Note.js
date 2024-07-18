const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    content: { type: String },
    tags: [String],
    color: { type: String, default: 'white' },
    archived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    reminder: { type: Date, default: null },
});

module.exports = mongoose.model('Note', NoteSchema);
