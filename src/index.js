// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const routes = require("./routers");
// const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
// const cors = require("cors");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../docs/swagger.json');

// const app = express();
// const categoryRoute = require('./routers/CategoryRoute');
// const shopRoute = require('./routers/ShopRoute');
// const reviewRoute = require('./routers/ReviewRoute');
// const categoryTypeRoute = require('./routers/CategoryTypeRoute');
// const voucherRouter = require('./routers/VoucherRouter')

// dotenv.config();
// const port = process.env.PORT || 3001;

// app.use(cookieParser());
// app.use(cors());
// app.use(express.json());
// // app.use(bodyParser.json({ limit: '10mb' }));

// // Đăng ký route cho Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/category-type', categoryTypeRoute);
// app.use('/api/category', categoryRoute);
// app.use('/api/shop', shopRoute);
// app.use('/api/review', reviewRoute);
// app.use('/api/vouchers', voucherRouter);

// // Các route khác của bạn
// routes(app);

// mongoose
//   .connect(process.env.MONGO_DB)
//   .then(() => {
//     console.log("CONNECT OK");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(port, "0.0.0.0", () => {
//   console.log("✅ Server is running on port 3000");
// });


const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routers");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const app = express();
const categoryRoute = require('./routers/CategoryRoute');
const shopRoute = require('./routers/ShopRoute');
const reviewRoute = require('./routers/ReviewRoute');
const categoryTypeRoute = require('./routers/CategoryTypeRoute');
const voucherRouter = require('./routers/VoucherRouter')
dotenv.config();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json({ limit: '10mb' }));

// Đăng ký route cho Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/category-type', categoryTypeRoute);
app.use('/api/category', categoryRoute);
app.use('/api/shop', shopRoute);
app.use('/api/review', reviewRoute);
app.use('/api/vouchers', voucherRouter);

// Các route khác của bạn
routes(app);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("CONNECT OK");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});