// routes/posts.js

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

// Create
router.post('/', async (req, res) => {
    try {
        const { fullName, username, email, password, role } = req.body;
        const newUser = new User({ fullName, username, email, password, role });
        const savedUser = await newUser.save();
        res.json(savedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Read
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

// Update
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, username, email, password, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { fullName, username, email, password, role }, { new: true });
        res.json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

module.exports = router;