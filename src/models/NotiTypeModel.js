const mongoose = require('mongoose')

const notiTypeSchema = new mongoose.Schema(
    {
        image: { type: String },
        name: { type: String, required: true, unique: true },
        description: { type: String },
        status: { type: Number, default: 1 },
        deletedAt: {type: Date, default: null},
    },
    {
        timestamps: true,
    }
);
const NotiType = mongoose.model('NotiType', notiTypeSchema);

module.exports = NotiType;