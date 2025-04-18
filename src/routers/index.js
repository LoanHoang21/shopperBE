const ProductRouter = require("./ProductRoute");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");

const routes = (app)=>{
    app.use("/api/product", ProductRouter)
    app.use("/api/auth", AuthRouter)

    app.use("/api/user", UserRouter)
}

module.exports = routes