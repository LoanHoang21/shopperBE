const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: { type: String},
        password: { type: String, required: true},
        phone: { type: String },
        email: { type: String },
        role: { type: Number, default: 0},
        isActive: {type: Boolean, default: true},
        fcm_token: {type: String, default: null},
        setting_noti_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SettingNoti',
            required: true,
        },
        backup_fcm_token: { type: String, default: null }, // dùng khi tắt tạm thời
        end_time: { type: Date, default: null }, // thời điểm bật lại nếu có
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

module.exports = User;