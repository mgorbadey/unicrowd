const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const masters = await prisma.user.findMany({
      where: { role: 'master' },
      select: {
        id: true,
        username: true,
        role: true,
        // city: true,
        info: true,
        userPic: true,
      },
    })
    const categories = await prisma.serviceCategory.findMany({})
    res.json({ masters, categories })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
