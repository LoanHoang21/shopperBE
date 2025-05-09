const mongoose = require('mongoose')

const notiSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: {type: String, required: true},
        image_sub: [{ type: String}],
        description: { type: String, required: true },
        notitype_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NotiType',
            required: true,
            // default: () => new mongoose.Types.ObjectId('68046110424a1ce38058d708'),
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            // required: true
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // tên model liên kết
            required: true
        },
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // tên model liên kết
            // required: true
        },
        is_read: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);
const Noti = mongoose.model('Noti', notiSchema);

module.exports = Noti;