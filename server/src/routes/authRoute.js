const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

module.exports = router