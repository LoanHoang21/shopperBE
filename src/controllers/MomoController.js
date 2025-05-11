const https = require('https');
const crypto = require('crypto');
const Order = require("../models/OrderModel");


const createMomoPayment = async (req, res) => {
  const { totalPrice, orderId } = req.body;

  if (!orderId || !totalPrice) {
    return res.status(400).json({ message: 'Thiếu orderId hoặc totalPrice' });
  }

  const partnerCode = 'MOMO';
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

  const requestId = partnerCode + new Date().getTime();
  const orderInfo = 'pay with MoMo';
  const redirectUrl = 'https://momo.vn/return';
  const ipnUrl = 'https://6459-2405-4802-1c8b-e420-d475-ea91-f184-3910.ngrok-free.app/api/order/ipn';
  const amount = totalPrice;
  const requestType = 'captureWallet';
  const extraData = '';

  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
    `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: 'en',
  });

  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  const momoReq = https.request(options, momoRes => {
    let data = '';

    momoRes.on('data', chunk => {
      data += chunk;
    });

    momoRes.on('end', async () => {
      try {
        const responseData = JSON.parse(data);
        const payUrl = responseData.payUrl;

        await Order.findByIdAndUpdate(orderId, {
          payUrl,
        });

        res.status(200).json({ payUrl: responseData.payUrl, data: responseData });
      } catch (err) {
        res.status(500).json({ error: 'Lỗi xử lý phản hồi từ MoMo' });
      }
    });
  });

  momoReq.on('error', e => {
    res.status(500).json({ error: e.message });
  });

  momoReq.write(requestBody);
  momoReq.end();
};

const momoIpn = async (req, res) => {
  const {
    partnerCode,
    orderId,
    requestId,
    amount,
    orderInfo,
    orderType,
    transId,
    resultCode,
    message,
    payType,
    responseTime,
    extraData,
    signature,
  } = req.body;

  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}` +
    `&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}` +
    `&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}` +
    `&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.log('❌ Sai chữ ký!');
    return res.status(400).json({ message: 'Invalid signature' });
  }

  console.log(orderId);

  if (resultCode === 0) {
    const order = await Order.findById(orderId);

    if (order) {
      order.payUrl = null;
      order.status = 'confirmed';
      await order.save();

      console.log(`✅ Đã cập nhật đơn hàng ${order._id} sau thanh toán MoMo`);
    }
  }

  console.log('✅ Chữ ký hợp lệ! Đơn hàng:', orderId);
  return res.status(200).json({ message: 'IPN received' });
};

module.exports = { createMomoPayment, momoIpn };
