require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Auth routes
const authRoutes = require('./authRoutes/authRoutes.js');
const signupRoute = require('./authRoutes/signupRoute.js');
const logoutRoute = require('./authRoutes/logoutRoute.js');
const userRoute = require('./authRoutes/userRoute.js');

// User routes
const roleRoute = require('./userRoutes/roleRoute.js');

// Models
const User = require('./models/User');
const Role = require('./models/Role.js');

// Secret Key
const secretKey = process.env.SECRET_KEY;

// Middleware
const verifyToken = require('./middleware/verifyToken');
const authorize = require('./middleware/authorize');

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/riviera');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // Start the server after the MongoDB connection is established
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to the Riviera Spa API');
});

app.post('/test', (req, res) => {
    console.log('Received a test request:', req.body);
    res.json({ message: 'Test successful' });
});

app.use('/signup', signupRoute);
app.use('/auth', authRoutes);
app.use('/logout', logoutRoute);
app.use('/users', userRoute);
app.use('/roles', roleRoute);

// Get all users (PROTECTED)
app.get('/users', verifyToken, authorize('Employee', 'Manager'), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// // Get all roles (PROTECTED)
// app.get('/roles', verifyToken, authorize('Employee', 'Manager'), async (req, res) => {
//     try {
//         const roles = await Role.find();
//         res.status(200).json(roles);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Get user details (PROTECTED)
app.get('/user/details', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId, {});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        res.status(200).json({
            user: user.toObject(),
            token: {
                decodedToken: req.user,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
