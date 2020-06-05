const paypal = require('@paypal/checkout-server-sdk');
const payPalClient = require('./payPalClient');

async function captureOrder(req, res) {
    // call PayPal to capture the order
    const orderCaptureRequest = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
    orderCaptureRequest.requestBody({});

    try {
        const captureResponse = await payPalClient.client().execute(orderCaptureRequest);

        // const captureID = captureResponse.result.purchase_units[0].payments.captures[0].id;
        // implement logic to save capture to your database for future reference
        // await database.saveCaptureID(captureID);
        res.status(200).json(captureResponse.result);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

module.exports = { captureOrder };