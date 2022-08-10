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
  // const city = await prisma.city.createMany({
  //   data: [
  //     { name: 'Москва' },
  //     { name: 'Санкт-Петербург' },
  //     { name: 'Новосибирск' },
  //     { name: 'Екатеринбург' },
  //     { name: 'Казань' },
  //     { name: 'Нижний Новгород' },
  //     { name: 'Челябинск' },
  //     { name: 'Омск' },
  //     { name: 'Самара' },
  //     { name: 'Ростов-на-Дону' },
  //     { name: 'Уфа' },
  //     { name: 'Красноярск' },
  //     { name: 'Пермь' },
  //     { name: 'Воронеж' },
  //     { name: 'Волгоград' },
  //   ],
  // })
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
