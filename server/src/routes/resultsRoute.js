const { getDataForResults } = require('../controllers/resultsController')
const router = require('express').Router()

router.get('/', getDataForResults)

module.exports = router
