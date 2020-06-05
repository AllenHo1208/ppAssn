const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const { router } = require('./server/router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'client')))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'Checkout.html'))
})
app.get('/Complete', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'Complete.html'))
})

const server = app.listen(process.env.PORT || 9000, function () {
    console.info(`App is running on ${server.address().address}:${server.address().port}`)
})