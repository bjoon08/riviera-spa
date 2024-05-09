// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Manager');

// Create
router.post('/', async (req, res) => {
    try {
        const { userId, managerId, department, directReports, roles } = req.body;
        const newManager = new Manager({ userId, managerId, department, directReports, roles });
        const savedManager = await newManager.save();
        res.json(savedManager);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Read
router.get('/', async (req, res) => {
    try {
        const managers = await Manager.find();
        res.json(managers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

// Update
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, managerId, department, directReports, roles } = req.body;
        const updatedManager = await Manager.findByIdAndUpdate(id, { userId, managerId, department, directReports, roles }, { new: true });
        res.json(updatedManager);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Manager.findByIdAndDelete(id);
        res.json({ message: 'Manager deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    
module.exports = router;