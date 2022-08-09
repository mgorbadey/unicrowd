const express = require('express');
const router = express.Router();
const {getAllWorkingSlots, createWorkingSlot} = require("../controllers/masterController")

router
  .route('/:id/schedules')
  .get(getAllWorkingSlots)
  // .post(createWorkingSlot)


module.exports = router;
