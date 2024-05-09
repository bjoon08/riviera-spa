// routes/posts.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create
router.post('/', async (req, res) => {
    try {
        const { userId, membershipStatus, membershipStartDate, membershipEndDate, appointments } = req.body;
        const newCustomer = new Customer({ userId, membershipStatus, membershipStartDate, membershipEndDate, appointments });
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Read
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find(); // Changed variable name to customers
        res.json(customers); // Changed variable name to customers
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

// Update
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, membershipStatus, membershipStartDate, membershipEndDate, appointments } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { userId, membershipStatus, membershipStartDate, membershipEndDate, appointments }, { new: true });
        res.json(updatedCustomer);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Customer.findByIdAndDelete(id);
        res.json({ message: 'Customer deleted successfully' }); // Changed message to match the operation
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

module.exports = router;