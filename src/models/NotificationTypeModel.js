const mongoose = require('mongoose')

const notificationTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        status: { type: String },
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: null},
        deletedAt: {type: Date, default: null},
        // image: {
        //     image1: {type: String, }
        // }
    },
    {
        timestamps: true,
    }
);
const NotificationType = mongoose.model('NotificationType', notificationTypeSchema);

module.exports = NotificationType;