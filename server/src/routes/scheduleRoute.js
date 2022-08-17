const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/scheduleController')

router.post('/create', scheduleController.create)

module.exports = router