window.onload = function() {
    const orderID = new URL(window.location.href).searchParams.get('orderID')
    this.document.getElementById('orderID').innerText = orderID
}