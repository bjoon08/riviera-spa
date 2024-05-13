const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const loginRoute = require('./loginRoute.js');
require('dotenv').config()
const secretKey = process.env.SECRET_KEY;

// Configure the local strategy for Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find user by username
            const user = await User.findOne({ username });
            // If user not found or password is wrong
            if (!user || !await bcrypt.compare(password, user.password)) {
                return done(null, false, { message: 'Incorrect username or password'});
            }
            // If user is found and password is correct, return user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Configure the JWT strategy for Passport
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}, (payload, done) => {
    User.findById(payload.userId, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// GET route to retrieve all user accounts
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.use('/login', loginRoute);

module.exports = router;
