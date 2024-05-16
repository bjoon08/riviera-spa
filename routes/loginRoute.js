const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const secretKey = process.env.SECRET_KEY;
console.log('Secret Key:', secretKey);

// Keep track of logged in users
let loggedInUsers = {};

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user is already logged in
        if (loggedInUsers[username]) {
            return res.status(400).json({ message: 'You are already logged in!' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // Set the user as logged in
        loggedInUsers[username] = true;

        res.json({ token, user: user.username, email: user.email });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
