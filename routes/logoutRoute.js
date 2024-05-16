const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Check if the JWT token is present
    if (!req.cookies.jwtToken) {
        return res.status(400).json({ message: 'You are already logged out' });
    }

    // Invalidate the JWT token
    res.clearCookie('jwtToken');

    // Send a sucess message
    res.json({ message: 'Logout successful' });
});

module.exports = router;
