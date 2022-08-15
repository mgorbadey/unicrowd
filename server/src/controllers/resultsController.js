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
    const mastersFromDB = await prisma.user.findMany({
      where: { role: 'master' },
      include: {
        serviceItem: true,
      },
    })
    const masters = mastersFromDB.map((master) => {
      delete master.password
      delete master.activationLink
      delete master.isActivated
      delete master.updatedAt
      return master
    })
    res.json({ categories, items, masters, cities })
  } catch (error) {
    console.log(error.message)
  }
}
