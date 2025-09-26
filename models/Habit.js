const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    note: String,
    frequency: { type: String, enum: ['daily', 'weekly', 'custom'], default: 'daily' },
    streak: { type: Number, default: 0 },
    lastChecked: Date,
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Habit', HabitSchema);
