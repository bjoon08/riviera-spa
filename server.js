const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Riviera Spa API');
});

app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, username, password, email, barcode, birthday, phoneNumber, code } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Save the user to the database
    // Example using Mongoose
    const newUser = new UserActivation({ firstName, lastName, username, password: hashedPassword, email, barcode, birthday, phoneNumber, code });
    await newUser.save();

    res.status(201).json({ message: 'User has been created successfully! Welcome to Riviera Spa!'});
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'riviera_spa', { expiresIn: '1h' });
    res.json({ token });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
