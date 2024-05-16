require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const signupRoute = require('./routes/signupRoute.js');
const logoutRoute = require('./routes/logoutRoute.js');
const User = require('./models/User.js');
const Role = require('./models/Role.js');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

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

// Get all users (PROTECTED)
app.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all roles (PROTECTED)
app.get('/roles', verifyToken, async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
