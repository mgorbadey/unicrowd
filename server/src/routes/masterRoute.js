const { Router } = require('express')
const router = Router()
const {getAllWorkingSlots, createWorkingSlot} = require("../controllers/masterController")

router
  .route('/:id/schedules')
  .get(getAllWorkingSlots)
  // .post(createWorkingSlot)

router.get('/:id/profile', (req, res) => {
    res.json({name: 'nikita'})
})

module.exports = router