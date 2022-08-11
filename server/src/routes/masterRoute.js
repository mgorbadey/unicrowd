const { Router } = require('express')
const router = Router()
const {getAllWorkingSlots, createWorkingSlot} = require("../controllers/masterController")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router
  .route('/:id/schedules')
  .get(getAllWorkingSlots)
  // .post(createWorkingSlot)

router.get('/:id/profile', async (req, res) => {
    const { id } = req.params
    console.log(id)
    // res.json({username: 'Иван Пупкин', email: 'ivan@gmail.com', info: 'Всем привет, делаю массаж простаты', userPic: 'images/2022-08-11T02:53:46.766Z-velomarshruty-v-moskve-4-2048.jpeg'})

    const { username, email, info, userPic } = await prisma.user.findFirst({
        where: {
          id: Number(id)
        }
      })

    res.json({username, email, info, userPic})
})

router.post('/updateProfile', async (req, res) => {
    const { id, city, textarea} = req.body

    const updateUser = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
            info: textarea
        },
      })

    res.json({info: req.body})
})

router.post('/modalTextUpdate', async (req, res) => {
    const { id, textarea} = req.body

    const updateUser = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
            info: textarea
        },
      })

    res.json({info: req.body})
})

module.exports = router