const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        enum: [
            'Customer', 'Employee', 'Manager',
        ],
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Role', roleSchema);
