const ProductRouter = require("./ProductRoute");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");
const CartRouter = require('./CartRouter');
const CartItemRouter = require('./CartItemRouter');

const routes = (app)=>{
    app.use("/api/product", ProductRouter)
    app.use("/api/auth", AuthRouter)
    app.use('/api/cartitems', CartItemRouter);
    app.use("/api/user", UserRouter)
    app.use('/api/cart', CartRouter);
}

module.exports = routes