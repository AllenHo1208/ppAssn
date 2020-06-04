const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'Checkout.html'))
})

app.get('/Complete', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'Complete.html'))
})

const server = app.listen(process.env.PORT || 9000, function () {
	console.info(`App is running on ${server.address().address}:${server.address().port}`)
})