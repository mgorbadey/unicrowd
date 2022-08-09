const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const data = await prisma.serviceCategory.createMany({
    data: [
      {
      title: 'Маникюр'
    },
    {
      title: 'Педикюр'
    },
    {
      title: 'Косметология'
    },
    {
      title: 'Депиляция'
    },
    {
      title: 'Брови и ресницы'
    },
    {
      title: 'Макияж'
    },
    {
      title: 'Стрижки'
    },
    {
      title: 'Прически'
    },
    {
      title: 'Массаж'
    }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
