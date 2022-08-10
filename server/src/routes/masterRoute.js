const { Router } = require('express')
const router = Router()

router.get('/:id/profile', (req, res) => {
    res.json({name: 'nikita'})
})

module.exports = router