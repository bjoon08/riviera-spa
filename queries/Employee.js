// routes/posts.js

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create
router.post('/', async (req, res) => {
    try {
        const { userId, employeeId, department, shift, clockedIn, availableDays } = req.body;
        const newEmployee = new Employee({ userId, employeeId, department, shift, clockedIn, availableDays });
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Read
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

// Update
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, employeeId, department, shift, clockedIn, availableDays } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { userId, employeeId, department, shift, clockedIn, availableDays }, { new: true });
        res.json(updatedEmployee);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

module.exports = router;