const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    managerId: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    directReports: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    roles: [{
        type: String
    }]
});

module.exports = mongoose.model('Manager', managerSchema);
