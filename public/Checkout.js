paypal.Buttons({
    createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
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
        });
    },
    onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            window.location.replace(`./Complete?orderId=${details.id}`);
        });
    }
}).render('#payPalBtn');