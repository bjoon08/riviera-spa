const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    status: {
        type: String,
        enum: [
            'pending', 'confirmed', 'completed', 'no-show', 'cancelled'
        ],
        default: 'pending',
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
