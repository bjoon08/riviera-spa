const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
