const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    membershipStatus: {
        type: String,
        enum: [
            'active', 'inactive', 'pending'
        ],
        default: 'pending'
    },
    membershipStartDate: {
        type: Data,
    },
    membershipEndDate: {
        type: Date,
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointments'
    }]
});

module.exports = mongoose.model('Customer', customerSchema);
