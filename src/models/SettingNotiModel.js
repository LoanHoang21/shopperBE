const mongoose = require('mongoose')

const settingnotiSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        status: { type: String, required: true},
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true,
    }
);
const SettingNoti = mongoose.model('SettingNoti', settingnotiSchema);

module.exports = SettingNoti;