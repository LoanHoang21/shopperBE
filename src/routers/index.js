const ProductRouter = require("./ProductRoute");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");
const NotiTypeRouter = require("./NotiTypeRouter");
const NotiRouter = require('./NotiRouter');
const OrderAdminRouter = require('./OrderAdminRouter');
const VoucherRouter = require('./VoucherRouter');
const CartRouter = require('./CartRouter');
const CartItemRouter = require('./CartItemRouter');

const routes = (app)=>{
    app.use("/api/product", ProductRouter)
    app.use("/api/auth", AuthRouter)
    app.use('/api/cartitems', CartItemRouter);
    app.use("/api/user", UserRouter)
    app.use("/api/notiType", NotiTypeRouter)
    app.use("/api/noti", NotiRouter)
    app.use("/api/orderAdmin", OrderAdminRouter)
    app.use("/api/voucher", VoucherRouter)
    app.use("/api/cart", CartRouter); // 

}

module.exports = routes