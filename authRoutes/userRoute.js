const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const authorize = require('../middleware/authorize');

// // Get all users (PROTECTED)
// app.get('/', verifyToken, authorize('Employee', 'Manager'), async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Delete a user (PROTECTED)
router.delete('/:username', verifyToken, authorize('Employee', 'Manager'), async (req, res) => {
    try {
        const userId = req.params.username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ username });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
