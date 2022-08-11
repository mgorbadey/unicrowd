const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const category = await prisma.serviceCategory.createMany({
    data: [
      {
        title: 'Маникюр',
      },
      {
        title: 'Педикюр',
      },
      {
        title: 'Косметология',
      },
      {
        title: 'Депиляция',
      },
      {
        title: 'Брови и ресницы',
      },
      {
        title: 'Макияж',
      },
      {
        title: 'Стрижки',
      },
      {
        title: 'Прически',
      },
      {
        title: 'Массаж',
      },
    ],
  })

  const user = await prisma.user.create({
    data: {
      username: 'Вася Васин',
      email: 'vasya@yandex.ru',
      password: 'password',
      activationLink: 'http://localhost:3500/auth/activate/',
      role: 'master',
    },
  })

  const schedule = await prisma.schedule.createMany({
    data: [
      {
        startDateTime: new Date('2022-08-09 09:00:00.000'),
        endDateTime: new Date('2022-08-09 14:00:00.000'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-09 15:00:00.000'),
        endDateTime: new Date('2022-08-09 17:00:00.000'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-14 09:00:00.000'),
        endDateTime: new Date('2022-08-14 15:00:00.000'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-10 10:00:00.000'),
        endDateTime: new Date('2022-08-10 14:00:00.000'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-07 10:30:00.000'),
        endDateTime: new Date('2022-08-07 12:30:00.000'),
        masterId: 1,
      },
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
