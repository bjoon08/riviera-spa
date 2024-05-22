const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Role = require('../models/Role.js');
const Joi = require('joi');

// Define Joi schema
const signupSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    birthday: Joi.date().iso().required(),
    phoneNumber: Joi.string().pattern(/^\(\d{3}\)\d{3}-\d{4}$/).required(), // Pattern for (xxx)xxx-xxxx format
    roleName: Joi.string().required()
});

router.post('/', async (req, res) => {
    // Validate the request body against the schema
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { fullName, email, username, password, birthday, phoneNumber, roleName } = value;

    try {
        const roles = await Role.findOne({});
        console.log('Available Roles:', roles);

        let role = await Role.findOne({ name: roleName });
        if (!role) {
            return res.status(400).json({ message: 'Invalid role name' });
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
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Catch-all route for 404 errors
router.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

module.exports = router;
