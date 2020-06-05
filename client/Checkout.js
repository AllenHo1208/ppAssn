function constructOrderRequest() {
    return {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": "USD",
                "value": document.getElementById('amount').innerText,
                "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": document.getElementById('amount').innerText
                    }
                }
            },
            "items": [{
                "name": document.getElementById('productName').innerText,
                "unit_amount": {
                    "currency_code": "USD",
                    "value": document.getElementById('amount').innerText
                },
                "quantity": "1"
            }],
            "shipping": {
                "address": {
                    "address_line_1": document.getElementById('address_line_1').innerText,
                    "address_line_2": document.getElementById('address_line_2').innerText,
                    "postal_code": document.getElementById('postal_code').innerText,
                    "country_code": document.getElementById('country_name').getAttribute('country_code')
                }
            }
        }]
    }
}

paypal.Buttons({
    // createOrder function, called when the buyer clicks the PayPal button
    createOrder: function () {
        return fetch('/api/createOrder', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(constructOrderRequest())
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            return data.orderID;
        });
    },
    // onApprove function, called after the buyer approves the transaction on paypal.com
    onApprove: function (data, actions) {
        return fetch('/api/captureOrder', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID })
        }).then(function (res) {
            return res.json();
        }).then(function (captureResult) {
            window.location.replace(`./Complete?orderID=${captureResult.id}`);
        }).catch(function (err) {
            console.error(err);
        });
    }
}).render('#payPalBtn');