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

dotenv.config();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Đăng ký route cho Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
