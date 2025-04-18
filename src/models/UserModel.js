const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: { type: String},
        password: { type: String, required: true},
        phone: { type: String },
        email: { type: String },
        role: { type: Number, default: 0},
        isActive: {type: Boolean, default: true},
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

module.exports = User;