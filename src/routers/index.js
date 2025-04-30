const ProductRouter = require("./ProductRoute");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");
const NotiTypeRouter = require("./NotiTypeRouter");
const NotiRouter = require('./NotiRouter');
const OrderRouter = require('./OrderRouter');
const VoucherRouter = require('./VoucherRouter');

const routes = (app)=>{
    app.use("/api/product", ProductRouter)
    app.use("/api/auth", AuthRouter)
    app.use("/api/user", UserRouter)
    app.use("/api/notiType", NotiTypeRouter)
    app.use("/api/noti", NotiRouter)
    app.use("/api/order", OrderRouter)
    app.use("/api/voucher", VoucherRouter)
}

module.exports = routes