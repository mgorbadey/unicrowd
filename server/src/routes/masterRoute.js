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

    const { username, email, info, userPic, city} = await prisma.user.findFirst({
        where: {
          id: Number(id)
        },
        include: {
            city: true,
        },
      })

    res.json({username, email, info, userPic, city})
})

router.get('/cityInfo', async (req, res) => {
    const city = await prisma.city.findMany()
    res.send({city})
})

router.get('/categoryInfo', async (req, res) => {
    const category = await prisma.serviceCategory.findMany()
    res.send({category})
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

router.post('/cityUpdate', async (req, res) => {
    const { id, city} = req.body

    const updateUser = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
            cityId: Number(city)
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

router.post('/createItem', async (req, res) => {

    const {masterId, categoryId, title, duration, price} = req.body

    if (categoryId === null) {
        categoryId = 1
    }

    const item = await prisma.ServiceItem.create({
        data: {
          title,
          serviceCategoryId: Number(categoryId),
          duration: Number(duration),
          masterId: Number(masterId),
          price: Number(price)
        },
      })
    console.log(item)
})

module.exports = router