const ProductRouter = require("./ProductRoute")

const routes = (app)=>{
    app.use("/api/product",ProductRouter)
}

module.exports = routes