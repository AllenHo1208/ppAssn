window.onload = function() {
    const orderId = new URL(window.location.href).searchParams.get('orderId')
    this.document.getElementById('orderId').innerText = orderId
}