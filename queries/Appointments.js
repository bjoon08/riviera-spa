// routes/posts.js

const express = require('express');
const router = express.Router();
const Appointments = require('../models/Appointments');

// Create
router.post('/', async (req, res) => {
    try {
        const { employeeId, dateTime, duration, customerId, status } = req.body;
        const newAppointment = new Appointments({ employeeId, dateTime, duration, customerId, status });
        const savedAppointment = await newAppointment.save();
        res.json(savedAppointment);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Read
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointments.find();
        res.json(appointments);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
// Update
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeId, dateTime, duration, customerId, status } = req.body;
        const updatedAppointment = await Appointments.findByIdAndUpdate(id, { employeeId, dateTime, duration, customerId, status }, { new: true });
        res.json(updatedAppointment);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Appointments.findByIdAndDelete(id);
        res.json({ message: 'Appointment deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

module.exports = router;