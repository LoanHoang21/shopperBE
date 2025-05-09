const ProductRouter = require("./ProductRoute");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");
const NotiTypeRouter = require("./NotiTypeRouter");
const NotiRouter = require('./NotiRouter');
const OrderAdminRouter = require('./OrderAdminRouter');
const VoucherRouter = require('./VoucherRouter');
const OrderRouter = require('./OrderRouter');
const ShipmentRouter = require('./ShipmentRouter');
const AddressRouter = require('./AddressRouter');
const CartRouter = require('./CartRouter');
const CartItemRouter = require('./CartItemRouter');
const PaymentMethodRouter = require('./PaymentMethodRouter');
const SettingNotiRouter = require('./SettingNotiRouter');

const routes = (app)=>{
    app.use("/api/product", ProductRouter)
    app.use("/api/auth", AuthRouter)
    app.use('/api/cartitems', CartItemRouter)
    app.use("/api/user", UserRouter)
    app.use("/api/notiType", NotiTypeRouter)
    app.use("/api/noti", NotiRouter)
    app.use("/api/orderAdmin", OrderAdminRouter)
    app.use("/api/voucher", VoucherRouter)
    app.use("/api/order", OrderRouter)
    app.use("/api/address", AddressRouter)
    app.use("/api/shipment", ShipmentRouter)
    app.use("/api/payment-method", PaymentMethodRouter)
    app.use("/api/cart", CartRouter); // 

    app.use("/api/settingNoti", SettingNotiRouter)
}

module.exports = routes