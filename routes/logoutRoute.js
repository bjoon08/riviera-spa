const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const loggedInUsers = require('./loginRoute.js');

router.post('/', verifyToken, (req, res) => {
    const username = req.user.userId;

    // Clear the logged in user
    if (loggedInUsers[username]) {
        delete loggedInUsers[username];
        return res.json({ message: 'Logout successful' });
    } else {
        return res.status(400).json({ message: 'You are already logged out!' });
    }
});

module.exports = router;
