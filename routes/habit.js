const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth'); 

// ➕ Create habit
router.post('/', auth, async (req, res) => {
    try {
        const habit = await Habit.create({ ...req.body, user: req.user.id });
        res.json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📋 Get all habits for logged-in user
router.get('/', auth, async (req, res) => {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
});

// ✅ Mark habit as completed today
router.post('/:id/complete', auth, async (req, res) => {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    const today = new Date().toDateString();
    const last = habit.lastChecked ? habit.lastChecked.toDateString() : null;

    if (last !== today) {
        habit.streak += 1;
        habit.lastChecked = new Date();
        await habit.save();
    }

    res.json(habit);
});

// 🗑️ Delete habit
router.delete('/:id', auth, async (req, res) => {
    await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
});

module.exports = router;
