const mongoose = require('mongoose');
const { Schema } = mongoose;
const Counter = require('./Counter');

const roleSchema = new Schema({
    roleId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        enum: [
            'Customer', 'Employee', 'Manager',
        ],
        required: true,
        unique: true,
    },
});

roleSchema.pre('save', async function(next) {
    const role = this;

    if (role.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'roleId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        role.roleId = counter.seq;
    }

    next();
})

module.exports = mongoose.model('Role', roleSchema);
