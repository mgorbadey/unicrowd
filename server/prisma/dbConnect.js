const { PrismaClient } = require('@prisma/client')

exports.dbConnect = async () => {
  try {
    const prisma = new PrismaClient()
    await prisma.$connect()
    console.log('Connect to database')
  } catch (error) {
    console.log('ебал я призму:', error.message)
  }
}
