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

  const city = await prisma.city.createMany({
    data: [
      { name: 'Москва' },
      { name: 'Санкт-Петербург' },
      { name: 'Новосибирск' },
      { name: 'Екатеринбург' },
      { name: 'Казань' },
      { name: 'Нижний Новгород' },
      { name: 'Челябинск' },
      { name: 'Омск' },
      { name: 'Самара' },
      { name: 'Ростов-на-Дону' },
      { name: 'Уфа' },
      { name: 'Красноярск' },
      { name: 'Пермь' },
      { name: 'Воронеж' },
      { name: 'Волгоград' },
    ],
  })

  const user = await prisma.user.createMany({
    data: [
      {
        username: 'Вася Васин',
        email: 'vasya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/1',
        role: 'master',
        cityId: 1,
      },
      {
        username: 'Петя Петин',
        email: 'petya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/2',
        role: 'master',
        cityId: 2,
      },
      {
        username: 'Дима Димин',
        email: 'dima@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/3',
        role: 'master',
        cityId: 3,
      },
      {
        username: 'Леша Лешин',
        email: 'lesha@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/4',
        role: 'master',
        cityId: 4,
      },
      {
        username: 'Паша Пашин',
        email: 'pasha@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/5',
        role: 'master',
        cityId: 5,
      },
      {
        username: 'Женя Женин',
        email: 'zhenya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/6',
        role: 'master',
        cityId: 6,
      },
      {
        username: 'Миша Мишин',
        email: 'misha@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/7',
        role: 'master',
        cityId: 7,
      },
      {
        username: 'Вова Вовин',
        email: 'vova@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/8',
        role: 'master',
        cityId: 8,
      },
      {
        username: 'Слава Славин',
        email: 'slava@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/9',
        role: 'master',
        cityId: 9,
      },
      {
        username: 'Даня Данин',
        email: 'danya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/10',
        role: 'master',
        cityId: 10,
      },
      {
        username: 'Сережа Сережин',
        email: 'serezha@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/11',
        role: 'master',
        cityId: 11,
      },
      {
        username: 'Алевтина',
        email: 'alya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/12',
        role: 'client',
        cityId: 1,
      },
      {
        username: 'Галина',
        email: 'galina@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/13',
        role: 'client',
        cityId: 1,
      },
      {
        username: 'Катерина',
        email: 'kate-star@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/14',
        role: 'client',
        cityId: 2,
      },
    ],
  })

  const items = await prisma.serviceItem.createMany({
    data: [
      {
        title: 'Макияж дневной',
        duration: 90,
        price: 4500,
        masterId: 11,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж дневной',
        duration: 120,
        price: 7500,
        masterId: 10,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж дневной',
        duration: 60,
        price: 2500,
        masterId: 9,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж дневной',
        duration: 90,
        price: 5000,
        masterId: 8,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж дневной',
        duration: 60,
        price: 1500,
        masterId: 7,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж дневной',
        duration: 60,
        price: 500,
        masterId: 6,
        serviceCategoryId: 6,
      },
      {
        title: 'Макияж вечерний',
        duration: 60,
        price: 1000,
        masterId: 6,
        serviceCategoryId: 6,
      },
      {
        title: 'Массаж рук',
        duration: 60,
        price: 1500,
        masterId: 5,
        serviceCategoryId: 9,
      },
      {
        title: 'Массаж спины',
        duration: 90,
        price: 2500,
        masterId: 5,
        serviceCategoryId: 9,
      },
      {
        title: 'Массаж головы',
        duration: 120,
        price: 5000,
        masterId: 5,
        serviceCategoryId: 9,
      },
      {
        title: 'Маникюр',
        duration: 60,
        price: 4000,
        masterId: 4,
        serviceCategoryId: 1,
      },
      {
        title: 'Педикюр аппаратный',
        duration: 90,
        price: 7000,
        masterId: 3,
        serviceCategoryId: 2,
      },
      {
        title: 'Педикюр обрезной',
        duration: 60,
        price: 2500,
        masterId: 3,
        serviceCategoryId: 2,
      },
      {
        title: 'Депиляция',
        duration: 60,
        price: 1500,
        masterId: 2,
        serviceCategoryId: 5,
      },
      {
        title: 'Окрашивание бровей',
        duration: 60,
        price: 2000,
        masterId: 2,
        serviceCategoryId: 5,
      },
      {
        title: 'Окрашивание ресниц',
        duration: 60,
        price: 2000,
        masterId: 2,
        serviceCategoryId: 5,
      },
      {
        title: 'Покрытие шеллаком',
        duration: 60,
        price: 1000,
        masterId: 1,
        serviceCategoryId: 1,
      },
      {
        title: 'Снятие шеллака',
        duration: 60,
        price: 500,
        masterId: 1,
        serviceCategoryId: 1,
      },
      {
        title: 'Окрашивание бровей',
        duration: 60,
        price: 2000,
        masterId: 1,
        serviceCategoryId: 5,
      },
      {
        title: 'Окрашивание ресниц',
        duration: 60,
        price: 2000,
        masterId: 1,
        serviceCategoryId: 5,
      },
      {
        title: 'Ламинирование бровей',
        duration: 60,
        price: 2000,
        masterId: 1,
        serviceCategoryId: 5,
      },
      {
        title: 'Ламинирование ресниц',
        duration: 60,
        price: 2000,
        masterId: 1,
        serviceCategoryId: 5,
      },
    ],
  })

  const event = await prisma.event.createMany({
    data: [
      {
        startDateTime: new Date('2022-08-13 10:00:00.000'),
        startDateForFilter: new Date('2022-08-13'),
        status: 'new',
        clientId: 1,
        masterId: 1,
        serviceItemId: 12,
      },
      {
        startDateTime: new Date('2022-08-13 13:00:00.000'),
        startDateForFilter: new Date('2022-08-13'),
        status: 'new',
        clientId: 1,
        masterId: 1,
        serviceItemId: 12,
      },
      {
        startDateTime: new Date('2022-08-14 12:00:00.000'),
        startDateForFilter: new Date('2022-08-14'),
        status: 'new',
        clientId: 2,
        masterId: 1,
        serviceItemId: 13,
      },
      {
        startDateTime: new Date('2022-08-15 12:00:00.000'),
        startDateForFilter: new Date('2022-08-15'),
        status: 'new',
        clientId: 1,
        masterId: 1,
        serviceItemId: 14,
      },
      {
        startDateTime: new Date('2022-08-15 14:00:00.000'),
        startDateForFilter: new Date('2022-08-15'),
        status: 'new',
        clientId: 1,
        masterId: 1,
        serviceItemId: 15,
      },
      {
        startDateTime: new Date('2022-08-15 17:00:00.000'),
        startDateForFilter: new Date('2022-08-15'),
        status: 'new',
        clientId: 1,
        masterId: 2,
        serviceItemId: 10,
      },
      {
        startDateTime: new Date('2022-08-18 13:00:00.000'),
        startDateForFilter: new Date('2022-08-18'),
        status: 'new',
        clientId: 1,
        masterId: 1,
        serviceItemId: 17,
      },
      {
        startDateTime: new Date('2022-08-17 11:00:00.000'),
        startDateForFilter: new Date('2022-08-17'),
        status: 'approved',
        clientId: 2,
        masterId: 1,
        serviceItemId: 14,
      },
      {
        startDateTime: new Date('2022-08-21 11:00:00.000'),
        startDateForFilter: new Date('2022-08-21'),
        status: 'approved',
        clientId: 1,
        masterId: 1,
        serviceItemId: 14,
      },
      {
        startDateTime: new Date('2022-08-20 11:30:00.000'),
        startDateForFilter: new Date('2022-08-20'),
        status: 'new',
        clientId: 2,
        masterId: 1,
        serviceItemId: 13,
      },
      {
        startDateTime: new Date('2022-08-19 11:00:00.000'),
        startDateForFilter: new Date('2022-08-19'),
        status: 'approved',
        clientId: 1,
        masterId: 1,
        serviceItemId: 15,
      },
      {
        startDateTime: new Date('2022-08-18 14:00:00.000'),
        startDateForFilter: new Date('2022-08-18'),
        status: 'approved',
        clientId: 1,
        masterId: 1,
        serviceItemId: 13,
      },
      {
        startDateTime: new Date('2022-08-17 16:00:00.000'),
        startDateForFilter: new Date('2022-08-17'),
        status: 'new',
        clientId: 2,
        masterId: 1,
        serviceItemId: 14,
      },
    ],
  })

  const schedule = await prisma.schedule.createMany({
    data: [
      {
        startDateTime: new Date('2022-08-09 09:00:00.000'),
        endDateTime: new Date('2022-08-09 14:00:00.000'),
        startDateForFilter: new Date('2022-08-09'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-09 15:00:00.000'),
        endDateTime: new Date('2022-08-09 17:00:00.000'),
        startDateForFilter: new Date('2022-08-09'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-14 09:00:00.000'),
        endDateTime: new Date('2022-08-14 15:00:00.000'),
        startDateForFilter: new Date('2022-08-14'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-10 10:00:00.000'),
        endDateTime: new Date('2022-08-10 14:00:00.000'),
        startDateForFilter: new Date('2022-08-10'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-07 10:30:00.000'),
        endDateTime: new Date('2022-08-07 12:30:00.000'),
        startDateForFilter: new Date('2022-08-07'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-09 10:00:00.000'),
        endDateTime: new Date('2022-08-09 12:30:00.000'),
        startDateForFilter: new Date('2022-08-09'),
        masterId: 2,
      },
      {
        startDateTime: new Date('2022-08-17 07:00:00.000'),
        endDateTime: new Date('2022-08-17 18:30:00.000'),
        startDateForFilter: new Date('2022-08-17'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-06 10:00:00.000'),
        endDateTime: new Date('2022-08-06 19:30:00.000'),
        startDateForFilter: new Date('2022-08-06'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-16 10:00:00.000'),
        endDateTime: new Date('2022-08-16 15:30:00.000'),
        startDateForFilter: new Date('2022-08-16'),
        masterId: 2,
      },
      {
        startDateTime: new Date('2022-08-16 10:00:00.000'),
        endDateTime: new Date('2022-08-16 15:30:00.000'),
        startDateForFilter: new Date('2022-08-16'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-18 08:00:00.000'),
        endDateTime: new Date('2022-08-18 17:30:00.000'),
        startDateForFilter: new Date('2022-08-18'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-19 09:00:00.000'),
        endDateTime: new Date('2022-08-19 17:30:00.000'),
        startDateForFilter: new Date('2022-08-19'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-20 10:00:00.000'),
        endDateTime: new Date('2022-08-20 18:30:00.000'),
        startDateForFilter: new Date('2022-08-20'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-21 09:00:00.000'),
        endDateTime: new Date('2022-08-21 17:00:00.000'),
        startDateForFilter: new Date('2022-08-21'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-15 12:00:00.000'),
        endDateTime: new Date('2022-08-15 16:30:00.000'),
        startDateForFilter: new Date('2022-08-15'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-22 10:00:00.000'),
        endDateTime: new Date('2022-08-22 18:30:00.000'),
        startDateForFilter: new Date('2022-08-22'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-23 09:00:00.000'),
        endDateTime: new Date('2022-08-23 17:00:00.000'),
        startDateForFilter: new Date('2022-08-23'),
        masterId: 1,
      },
      {
        startDateTime: new Date('2022-08-24 12:00:00.000'),
        endDateTime: new Date('2022-08-24 16:30:00.000'),
        startDateForFilter: new Date('2022-08-24'),
        masterId: 1,
      },
    ],
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
