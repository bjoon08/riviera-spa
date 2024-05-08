const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        enum: ['morning', 'afternoon', 'evening'],
        required: true
    },
    clockedIn: {
        type: Boolean,
        default: false
    },
    availableDays: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
});

module.exports = mongoose.model('Employee', employeeSchema);
