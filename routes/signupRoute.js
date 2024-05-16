const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Role = require('../models/Role.js');

router.post('/', async (req, res) => {
    const { fullName, email, username, password, birthday, phoneNumber, roleName } = req.body;

    try {
        let role = await Role.findOne({ name: roleName });
        if (!role) {
            role = new Role({ name: roleName });
            await role.save();
        }

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ fullName, email, username, password, birthday, phoneNumber, role: role._id });
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

// Catch-all route for 404 errors
router.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

module.exports = router;
