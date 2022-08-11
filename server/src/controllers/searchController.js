const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getDataForSearch = async (req, res) => {
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

    const strings = [...masters, ...categories].map(
      (string) => string.username || string.title
    )

    res.json(strings)
  } catch (error) {
    console.log(error.message)
  }
}
