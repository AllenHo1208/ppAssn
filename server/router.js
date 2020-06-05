const Router = require('express').Router

const { createOrder } = require('./createOrder')
const { captureOrder } = require('./captureOrder')

const router = Router()
router.post('/createOrder', createOrder)
router.post('/captureOrder', captureOrder)

module.exports = { router: router };