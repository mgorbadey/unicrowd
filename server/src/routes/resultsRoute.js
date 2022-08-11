const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const data = await prisma.serviceCategory.findMany({
      include: {
        serviceItem: {
          include: {
            master: {
              include: {
                city: true,
              },
            },
          },
        },
      },
    })
    console.log('data: ', data)
    res.json(data)
  } catch (error) {
    console.log(error.message)
  }
})

// router.post('/', async (req, res) => {
//   const { name } = req.body
//   const masters = await prisma.user.findMany({
//     where: { role: 'master' },
//   })
// })

module.exports = router
