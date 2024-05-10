const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const signupRoute = require('./routes/signupRoute.js');
const logoutRoute = require('./routes/logoutRoute.js');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/riviera', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
    res.send('Welcome to the Riviera Spa API');
});

app.use('/api/auth', authRoutes);
app.use('/api/signup', signupRoute);
app.use('/api/logout', logoutRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
