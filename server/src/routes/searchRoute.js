const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const masters = await prisma.user.findMany({
      where: { role: 'master' },
      select: {
        username: true,
      },
    })
    const categories = await prisma.serviceCategory.findMany({
      select: {
        title: true,
      },
    })

    res.json({ masters, categories })
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
