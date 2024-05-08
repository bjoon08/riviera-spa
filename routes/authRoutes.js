require('dotenv').config()
const secretKey = process.env.SECRET_KEY;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');

// Signup route
router.post('/signup', async (req, res) => {
    const { fullName, email, username, password, birthday, phoneNumber } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ fullName, email, username, password, birthday, phoneNumber });
        // 'genSalt' is a method provided by bcrypt to generate a salt, which is a random value used
        // during the hashing process. '10' passed to 'genSalt' is the cost factor, which determines
        // the complexity of the hashing algorithm. Higher cost factor means more effort needed to crack.
        const salt = await bcrypt.genSalt(10);
        // we then use the password we input and the generated salt to assign the new hashed password
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res,status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
