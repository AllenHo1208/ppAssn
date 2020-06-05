const paypal = require('@paypal/checkout-server-sdk');
const payPalClient = require('./payPalClient'); // PayPal HTTP client

async function createOrder(req, res) {
    // call PayPal to set up a transaction
    const orderCreateRequest = new paypal.orders.OrdersCreateRequest();
    orderCreateRequest.prefer("return=representation");
    orderCreateRequest.requestBody(req.body);

    try {
        const order = await payPalClient.client().execute(orderCreateRequest);
        // return a successful response to the client with the order ID
        res.status(200).json({ orderID: order.result.id });
    } catch (err) {
        console.error('createOrder catched error:');
        console.error(err);
        res.status(err.statusCode).json({ error: JSON.parse(err.message) });
    }
}

module.exports = { createOrder };   