const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getDataForResults = async (req, res) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      select: {
        id: true,
        title: true,
      },
    })
    const items = await prisma.serviceItem.findMany({})
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    const masters = await prisma.user.findMany({
      where: { role: 'master' },
      select: {
        id: true,
        username: true,
        role: true,
        info: true,
        userPic: true,
        cityId: true,
        email: true,
        createdAt: true,
      },
    })
    res.json({ categories, items, masters, cities })
  } catch (error) {
    console.log(error.message)
  }
}
