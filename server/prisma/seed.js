const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const category = await prisma.serviceCategory.createMany({
    data: [
      {
        title: "Маникюр",
      },
      {
        title: "Педикюр",
      },
      {
        title: "Косметология",
      },
      {
        title: "Депиляция",
      },
      {
        title: "Брови и ресницы",
      },
      {
        title: "Макияж",
      },
      {
        title: "Стрижки и уход",
      },
      {
        title: "Прически",
      },
      {
        title: "Массаж",
      },
    ],
  });

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
        username: 'Елена Иванова',
        email: 'elena@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/1',
        role: 'master',
        cityId: 1,
        info: 'Я из России и работаю в бьюти-индустрии уже 14 лет. Все началось еще в школе, когда я, освоив маникюр, стала делать его всем своим друзьям и знакомым. Потом пошла учиться на экономиста в Высшую школу приватизации и предпринимательства, переехала в Москву. В столице устроилась работать в «Сбербанк», однако быстро поняла, что зарплата оставляет желать лучшего, и на мое хобби — путешествия — денег не хватает.',
        // userPic: 'https://uprostim.com/wp-content/uploads/2021/05/image106-3.jpg'
      },
      {
        username: 'Марина Глухарева',
        email: 'marina@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/2',
        role: 'master',
        cityId: 1,
        info: 'Мой путь начинался в школьные годы, в качестве хобби. Мне нравилось делать себе красивый маникюр, на мои ногти обращали внимание подружки и просили сделать им такой же. По окончанию школы я еще не определилась чем бы мне хотелось заниматься всерьез, поэтому я решила пропустить год, чтобы определиться с ВУЗом и специальностью. Чтобы не бездельничать аж целый год, решила превратить свое хобби в живые деньги и пошла на курсы «мастера маникюра».'
      },
      {
        username: 'Максим Владимирович',
        email: 'maksim@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/3',
        role: 'master',
        cityId: 1,
        info: 'Всем привет! Записывайтесь ко мне! Принимаю на дому, а также могу приехать к вам.'
      },
      {
        username: 'Дарьяна',
        email: 'dariana@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/4',
        role: 'master',
        cityId: 1,
      },
      {
        username: 'Рустемчик',
        email: 'rustemchik@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/5',
        role: 'master',
        cityId: 2,
      },
      {
        username: 'Лейла',
        email: 'leila@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/6',
        role: 'master',
        cityId: 2,
      },
      {
        username: 'Гульнура',
        email: 'gulnura@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/7',
        role: 'master',
        cityId: 2,
      },
      {
        username: 'Олеся',
        email: 'olesya@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/8',
        role: 'master',
        cityId: 3,
      },
      {
        username: 'Катерина Бьюти',
        email: 'katerina@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/9',
        role: 'master',
        cityId: 3,
      },
      {
        username: 'Сюзанна',
        email: 'suzanna@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/10',
        role: 'master',
        cityId: 3,
      },
      {
        username: 'Рафаэль',
        email: 'rafael@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/11',
        role: 'master',
        cityId: 4,
      },
      {
        username: 'Владимир Владимиров',
        email: 'vladimir@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/12',
        role: 'master',
        cityId: 5,
      },
      {
        username: 'Владлена',
        email: 'vladlena@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/13',
        role: 'client',
        cityId: 1,
      },
      {
        username: 'Александра',
        email: 'aleksandra@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/14',
        role: 'client',
        cityId: 1,
      },
      {
        username: 'Георгий Аркадьевич',
        email: 'georgy@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/15',
        role: 'client',
        cityId: 1,
      },
      {
        username: 'Сережа',
        email: 'serezha@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/16',
        role: 'client',
        cityId: 2,
      },
      {
        username: 'Каралина',
        email: 'karalina@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/17',
        role: 'client',
        cityId: 2,
      },
      {
        username: 'Грета',
        email: 'greta@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/18',
        role: 'client',
        cityId: 2,
      },
      {
        username: 'Мила',
        email: 'mila@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/19',
        role: 'client',
        cityId: 3,
      },
      {
        username: 'Анфиса',
        email: 'anfisa@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/20',
        role: 'client',
        cityId: 3,
      },
      {
        username: 'Галина',
        email: 'galina@yandex.ru',
        password: 'password',
        activationLink: 'http://localhost:3500/auth/activate/21',
        role: 'client',
        cityId: 4,
      },
    ]
  })

  const items = await prisma.serviceItem.createMany({
    data:
    [
  {
      title: "Маникюр европейский",
      duration: 120,
      price: 690,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический",
      duration: 120,
      price: 790,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный",
      duration: 120,
      price: 890,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Аппаратный маникюр одновременно с педикюром",
      duration: 120,
      price: 1050,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр CHRISTINA FITZGERALD",
      duration: 120,
      price: 1990,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр японский",
      duration: 120,
      price: 1490,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный",
      duration: 120,
      price: 790,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр (одновременно с педикюром)",
      duration: 120,
      price: 950,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "SPA процедура (без маникюра)",
      duration: 60,
      price: 690,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Бразильский SPA (без маникюра)",
      duration: 60,
      price: 990,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр «Солнечный»",
      duration: 120,
      price: 1250,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр «Горячий»",
      duration: 120,
      price: 1490,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Детский до 12 лет (с покрытием)",
      duration: 60,
      price: 400,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "SPA скраб",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Снятие лака",
      duration: 60,
      price: 60,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Оформление формы (без маникюра)",
      duration: 60,
      price: 150,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Полировка ногтей",
      duration: 60,
      price: 150,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Запечатывание ногтей (полировка + масло)",
      duration: 60,
      price: 250,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт натурального ногтя (акрил)",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Снятие Shellac",
      duration: 90,
      price: 290,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Массаж рук",
      duration: 60,
      price: 150,
      masterId: 1,
      serviceCategoryId: 9
  },
  {
      title: "Парафинотерапия",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "SPA маска/скраб",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 1
  },
  {
      title: "Педикюр классический",
      duration: 120,
      price: 1490,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный",
      duration: 120,
      price: 1790,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный",
      duration: 120,
      price: 1890,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр CHRISTINA FITZGERALD",
      duration: 120,
      price: 2690,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр японский",
      duration: 120,
      price: 2920,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр в отдельной педикюрной",
      duration: 120,
      price: 2690,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический GEHWOL",
      duration: 120,
      price: 2090,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный GEHWOL",
      duration: 120,
      price: 2490,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный GEHWOL",
      duration: 120,
      price: 2690,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Smart - педикюр",
      duration: 120,
      price: 2490,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Процедура SPA (без педикюра)",
      duration: 120,
      price: 890,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр (только пяточки)",
      duration: 120,
      price: 1090,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Экспресс (только пальчики)",
      duration: 120,
      price: 1090,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Лимфодреннаж ног",
      duration: 120,
      price: 300,
      masterId: 1,
      serviceCategoryId: 9
  },
  {
      title: "SPA скраб",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Снятие лака",
      duration: 60,
      price: 60,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Оформление формы (без педикюра)",
      duration: 60,
      price: 220,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Полировка ногтей",
      duration: 60,
      price: 250,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Запечатывание ногтей",
      duration: 60,
      price: 350,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Ремонт натурального ногтя (акрил)",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Ремонт натурального ногтя (шелк)",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Парафинотерапия",
      duration: 90,
      price: 350,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "SPA маска/скраб",
      duration: 60,
      price: 200,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Детский педикюр (без покрытия)",
      duration: 60,
      price: 750,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Удаление натоптыша или мазоли",
      duration: 60,
      price: 100,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Удаление стержневой мазоли",
      duration: 60,
      price: 390,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Удаление мозоли",
      duration: 60,
      price: 290,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Удаление вросшего ногтя",
      duration: 60,
      price: 1000,
      masterId: 1,
      serviceCategoryId: 2
  },
  {
      title: "Контурная пластика с применением PROFHILO 2,0 мл",
      duration: 90,
      price: 26500,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Ботулинотерапия. Препараты: Botox, Dysport, Xeomin",
      duration: 60,
      price: 170,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Контурная пластика. Препараты: Restylane, Juvederm, Belotero, Radiesse.",
      duration: 90,
      price: 21000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Биоревитализация. Препараты: Meso-Wharton, Meso-Xanthin, Juviderm.",
      duration: 90,
      price: 12000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "PRP-плазмотерапия Cortexil (1 пробирка)",
      duration: 90,
      price: 11000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "PRP-терапия Regen Lab (1 пробирка синяя или красная)",
      duration: 60,
      price: 21500,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "PRP-терапия Regen Lab Cellular Matrix (золотая пробирка)",
      duration: 60,
      price: 39000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Мезотерапия лица",
      duration: 60,
      price: 5950,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Мезотерапия тела",
      duration: 60,
      price: 5000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Озонотерапия",
      duration: 60,
      price: 530,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Озонотерапия лица",
      duration: 60,
      price: 1890,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "3D-мезонити (за штуку)",
      duration: 60,
      price: 1300,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Нити APTOS",
      duration: 60,
      price: 8000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Контурная интимная пластика",
      duration: 60,
      price: 18000,
      masterId: 2,
      serviceCategoryId: 3
  },
  {
      title: "Окраска бровей краской",
      duration: 60,
      price: 600,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание бровей краской и форма бровей",
      duration: 60,
      price: 1400,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окраска бровей хной",
      duration: 60,
      price: 900,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание бровей хной и форма бровей",
      duration: 60,
      price: 1700,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание бровей+ресниц+форма бровей",
      duration: 60,
      price: 2000,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окраска ресниц краской",
      duration: 60,
      price: 600,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Осветление бровей / перед окрашиванием",
      duration: 60,
      price: 300,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание ресниц + бровей /краской/",
      duration: 60,
      price: 1200,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание ресниц + бровей /хной/",
      duration: 60,
      price: 1800,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Форма бровей",
      duration: 60,
      price: 800,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окраска ресниц хной",
      duration: 60,
      price: 900,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Архитектура бровей",
      duration: 60,
      price: 1800,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание бровей, ресниц хной + форма бровей",
      duration: 60,
      price: 2600,
      masterId: 2,
      serviceCategoryId: 5
  },
  {
      title: "Подмышечные впадины",
      duration: 30,
      price: 1920,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Верхняя губа",
      duration: 15,
      price: 1440,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Межбровье",
      duration: 15,
      price: 1440,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Подбородок",
      duration: 15,
      price: 1600,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Щеки",
      duration: 15,
      price: 1840,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Шея",
      duration: 15,
      price: 1840,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Лоб",
      duration: 15,
      price: 1440,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Бакенбарды",
      duration: 15,
      price: 1440,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Лицо полностью",
      duration: 30,
      price: 4000,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Грудь",
      duration: 30,
      price: 2000,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Ореолы",
      duration: 15,
      price: 1000,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Живот",
      duration: 30,
      price: 2960,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Белая линия живота",
      duration: 15,
      price: 1440,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Спина нижняя треть",
      duration: 15,
      price: 2400,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Спина полностью",
      duration: 30,
      price: 4800,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Пальцы рук / ног",
      duration: 15,
      price: 1400,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Кисти рук / подъем ног",
      duration: 15,
      price: 1400,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Руки до локтя",
      duration: 30,
      price: 3200,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Руки полностью",
      duration: 40,
      price: 4480,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Внутренняя поверхность бедер",
      duration: 30,
      price: 2800,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Вся поверхность бедер",
      duration: 40,
      price: 5200,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Колени",
      duration: 15,
      price: 1600,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Голени с коленями",
      duration: 40,
      price: 4000,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью",
      duration: 60,
      price: 6640,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Бикини классика",
      duration: 30,
      price: 2400,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Глубокое бикини",
      duration: 30,
      price: 3360,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "Ягодицы",
      duration: 30,
      price: 2160,
      masterId: 3,
      serviceCategoryId: 4
  },
  {
      title: "\"Экспресс\" макияж",
      duration: 60,
      price: 800,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Вечерний макияж",
      duration: 60,
      price: 1600,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Сложный макияж",
      duration: 60,
      price: 2000,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Свадебный макияж (без пробного)",
      duration: 60,
      price: 2000,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Свадебный макияж (с пробным)",
      duration: 60,
      price: 2700,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Реснички-пучки",
      duration: 60,
      price: 500,
      masterId: 4,
      serviceCategoryId: 6
  },
  {
      title: "Стрижка женская(экспресс укладка)",
      duration: 60,
      price: 900,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Подравнивание (одним срезом)",
      duration: 60,
      price: 500,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка горячим лезвием",
      duration: 60,
      price: 1500,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Окрашивание в 1 тон короткая",
      duration: 60,
      price: 1500,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Сложное окрашивание короткая",
      duration: 60,
      price: 3000,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Мелирование (без тонирование) короткая",
      duration: 60,
      price: 2000,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Абсолютное счастье для волос LEBEL короткая",
      duration: 60,
      price: 2500,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "OLAPLEX при стрижке",
      duration: 60,
      price: 800,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Экспресс уход MATRIX",
      duration: 60,
      price: 300,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Укладка(мытье + средства)",
      duration: 60,
      price: 1200,
      masterId: 5,
      serviceCategoryId: 7
  },
  {
      title: "Экспресс-прическа",
      duration: 60,
      price: 2000,
      masterId: 5,
      serviceCategoryId: 8
  },
  {
      title: "Вечерняя прическа",
      duration: 60,
      price: 3000,
      masterId: 5,
      serviceCategoryId: 8
  },
  {
      title: "Покрытие гель-лаком ELPAZA",
      duration: 60,
      price: 500,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие гель-лаком UNO",
      duration: 60,
      price: 800,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие гелем LUXIO",
      duration: 60,
      price: 1100,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие топом и базой",
      duration: 60,
      price: 300,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие лаком",
      duration: 60,
      price: 300,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие VINYLUX",
      duration: 60,
      price: 300,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Лечебное покрытие бесцветное",
      duration: 60,
      price: 100,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Полировка ногтей",
      duration: 60,
      price: 290,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие гель-лака (руки)",
      duration: 60,
      price: 200,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический + гель-лак ELPAZAМаникюр классический или европейский - на выбор.",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный + гель-лак ELPAZA",
      duration: 60,
      price: 1090,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный + гель-лак ELPAZA",
      duration: 60,
      price: 1090,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический + гель-лак UNOМаникюр классический или европейский - на выбор.",
      duration: 60,
      price: 1190,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный + гель-лак UNO",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный + гель-лак UNO",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический + гель LUXIOМаникюр классический или европейский - на выбор.",
      duration: 60,
      price: 1490,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный + гель LUXIO",
      duration: 60,
      price: 1690,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный + гель LUXIO",
      duration: 60,
      price: 1690,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический + лакМаникюр классический или европейский - на выбор.",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический + VYNILUXМаникюр классический или европейский - на выбор.",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Парафинотерапия холодная ARAVIA (руки)",
      duration: 60,
      price: 290,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Массаж рук - Продолжительность 10ут.",
      duration: 60,
      price: 190,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический (без последующего покрытия)Маникюр классический или европейский - на выбор.",
      duration: 60,
      price: 590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр классический (с последующим покрытием)Маникюр классический или европейский - на выбор.",
      duration: 60,
      price: 390,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный (без последующего покрытия)",
      duration: 60,
      price: 790,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный (с последующим покрытием)",
      duration: 60,
      price: 590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный (без последующего покрытия)",
      duration: 60,
      price: 790,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный (с последующим покрытием)",
      duration: 60,
      price: 590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр детский",
      duration: 60,
      price: 190,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие лака (руки)",
      duration: 60,
      price: 50,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие наращенных ногтей",
      duration: 60,
      price: 590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей + маникюр + гель-лак ELPAZAНаращивание гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 2980,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей (длина от 4) + маникюр + гель-лак ELPAZAНаращивание гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3280,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей + маникюр + гель-лак UNOНаращивание гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3280,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей (длина от 4) + маникюр + гель-лак UNOНаращивание гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3580,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей + маникюр + гель LUXIOНаращивание гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3580,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей (длина от 4) + маникюр + гель LUXIOНаращивание гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3880,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей + маникюр + гель-лак ELPAZAСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 2480,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей + маникюр + гель-лак UNOСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 2780,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей + маникюр + гель LUXIOСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина до 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3080,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей (длина от 4) + маникюр + гель-лак ELPAZAСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 2580,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей (длина от 4) + маникюр + гель-лак UNOСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 2880,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей (длина от 4) + маникюр + гель LUXIOСнятие верхнего слоя покрытия, коррекция гелем/полигелем (длина от 4), маникюр комбинированный/аппаратный.",
      duration: 60,
      price: 3180,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие гелевого укрепления",
      duration: 60,
      price: 590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление гелем / полигелем",
      duration: 60,
      price: 790,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие гелевого укрепления + Укрепление гелем / полигелем",
      duration: 60,
      price: 1180,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление акриловой пудрой",
      duration: 60,
      price: 390,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление ногтевой пластины базой",
      duration: 60,
      price: 290,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Система укрепления и восстановления ногтей IBX SYSTEM",
      duration: 60,
      price: 490,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Система укрепления и восстановления ногтей IBX BOOST",
      duration: 60,
      price: 790,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Укрепляющее гелевое покрытие Vitagel",
      duration: 60,
      price: 390,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Придание формы ногтям",
      duration: 60,
      price: 190,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт 1 ногтя (трещина)Ремонт без изменения формы и длины ногтя.",
      duration: 60,
      price: 100,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт 1 ногтя (скол)Ремонт ногтя - наращивание / донаращивание.",
      duration: 60,
      price: 200,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Снятие гель-лака (ноги)",
      duration: 60,
      price: 300,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический + гель-лак ELPAZA",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный + гель-лак ELPAZA",
      duration: 60,
      price: 1690,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный + гель-лак ELPAZA",
      duration: 60,
      price: 1690,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический + гель-лак UNO",
      duration: 60,
      price: 1690,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный + гель-лак UNO",
      duration: 60,
      price: 1990,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный + гель-лак UNO",
      duration: 60,
      price: 1990,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический + гель LUXIO",
      duration: 60,
      price: 1990,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный + гель LUXIO",
      duration: 60,
      price: 2290,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный + гель LUXIO",
      duration: 60,
      price: 2290,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "SMART-педикюр + гель-лак ELPAZAАппаратный педикюр с использованием специальных Smart-дисков для эффективной обработки стоп.",
      duration: 60,
      price: 1890,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "SMART-педикюр + гель-лак UNOАппаратный педикюр с использованием специальных Smart-дисков для эффективной обработки стоп.",
      duration: 60,
      price: 2190,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "SMART-педикюр + гель LUXIOАппаратный педикюр с использованием специальных Smart-дисков для эффективной обработки стоп.",
      duration: 60,
      price: 2490,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр - экспресс + гель-лак ELPAZAОбработка пальчиков без стопы.",
      duration: 60,
      price: 1290,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр - экспресс + гель-лак UNOОбработка пальчиков без стопы.",
      duration: 60,
      price: 1590,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр - экспресс + гель LUXIOОбработка пальчиков без стопы.",
      duration: 60,
      price: 1890,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический + лак",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический + VYNILUX",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Spa-уход FootlogixГлубокоувлажняющий уход за стопами с использованием педицевтических средств Footlogix: жидкого мыла, скраба с морскими водорослями, средства для размегчения мозолей, крем-мусса.",
      duration: 60,
      price: 490,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Парафинотерапия холодная ARAVIA (ноги)",
      duration: 60,
      price: 390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Массаж ног - Продолжительность 10ут.",
      duration: 60,
      price: 290,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический (без последующего покрытия)",
      duration: 60,
      price: 1090,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр классический (с последующим покрытием)",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный (без последующего покрытия)",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр комбинированный (с последующим покрытием)",
      duration: 60,
      price: 1190,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный (без последующего покрытия)",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр аппаратный (с последующим покрытием)",
      duration: 60,
      price: 1190,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "SMART-педикюр (без последующего покрытия)",
      duration: 60,
      price: 1590,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "SMART-педикюр (c последующим покрытием)",
      duration: 60,
      price: 1390,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр - экспресс (без последующего покрытия)Обработка пальчиков без стопы.",
      duration: 60,
      price: 990,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Педикюр - экспресс (с последующим покрытием)Обработка пальчиков без стопы.",
      duration: 60,
      price: 790,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Снятие лака (ноги)",
      duration: 60,
      price: 100,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Обработка сложного ногтя (начальная стадия)1 ноготь",
      duration: 60,
      price: 290,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Обработка сложного участка стопы (начальная стадия)1 участок",
      duration: 60,
      price: 190,
      masterId: 2,
      serviceCategoryId: 2
  },
  {
      title: "Маникюр классический мужской",
      duration: 60,
      price: 690,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр комбинированный мужской",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр аппаратный мужской",
      duration: 60,
      price: 890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Педикюр классический мужской",
      duration: 60,
      price: 1290,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Педикюр комбинированный мужской",
      duration: 60,
      price: 1590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Педикюр аппаратный мужской",
      duration: 60,
      price: 1590,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Педикюр-экспресс мужскойОбработка пальчиков без стопы.",
      duration: 60,
      price: 1190,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "SMART-педикюр мужской",
      duration: 60,
      price: 1890,
      masterId: 2,
      serviceCategoryId: 1
  },
  {
      title: "Массаж лица",
      duration: 60,
      price: 6400,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Массаж лица и зоны декольте",
      duration: 60,
      price: 8100,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Антицеллюлитный массаж (живот+талия+бедра+ягодицы+руки)",
      duration: 60,
      price: 10400,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Антицеллюлитный массаж (живот+талия)",
      duration: 60,
      price: 6700,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Антицеллюлитный массаж (бедра+ягодицы)",
      duration: 60,
      price: 9300,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Массаж головы",
      duration: 60,
      price: 3000,
      masterId: 3,
      serviceCategoryId: 6
  },
  {
      title: "Глубокое бикини",
      duration: 60,
      price: 1990,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Бикини классика",
      duration: 60,
      price: 1290,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью",
      duration: 60,
      price: 3990,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Голень/Бедра",
      duration: 60,
      price: 2290,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Подмышечные впадены",
      duration: 60,
      price: 990,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Руки полностью",
      duration: 60,
      price: 2290,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Руки до локтя",
      duration: 60,
      price: 1790,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Брови",
      duration: 60,
      price: 690,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Усики",
      duration: 60,
      price: 490,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Ноздри / уши / соски",
      duration: 60,
      price: 490,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Виски / скулы",
      duration: 60,
      price: 590,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Спина",
      duration: 60,
      price: 1790,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Поясница",
      duration: 60,
      price: 1290,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Ягодицы",
      duration: 60,
      price: 1490,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Живот",
      duration: 60,
      price: 1290,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Лицо полностью",
      duration: 60,
      price: 1490,
      masterId: 4,
      serviceCategoryId: 4
  },
  {
      title: "Женская стрижка (длина волос до 25 см.)(сушка до 10.)",
      duration: 60,
      price: 590,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Женская стрижка (длина волос от 25 см.)(сушка до 10.)",
      duration: 60,
      price: 780,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Мужская стрижка (машинкой)",
      duration: 60,
      price: 390,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Мужская стрижка (ножницами, стайлинг)",
      duration: 60,
      price: 590,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Барбер стрижка",
      duration: 60,
      price: 790,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Детская стрижка(до 7 лет)",
      duration: 60,
      price: 490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка челки",
      duration: 60,
      price: 290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Коррекция формы бороды",
      duration: 60,
      price: 390,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Полировка волос",
      duration: 60,
      price: 1690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONEPLEX Ultra-защита в окрашивании",
      duration: 60,
      price: 550,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONEPLEX Ultra-защита в окрашивании (суперосветление)",
      duration: 60,
      price: 650,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONEPLEX Ultra-защита при блондировании",
      duration: 60,
      price: 850,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONEPLEX Ultra-восстановление и защита волос",
      duration: 60,
      price: 650,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Маска \"Экстремальное увлажнение\"",
      duration: 60,
      price: 190,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Маска \"Защита и сохранение цвета\"",
      duration: 60,
      price: 290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Экстремальное восстановление RE-Bond",
      duration: 60,
      price: 290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Нейтрализация желтизны Brass off",
      duration: 60,
      price: 290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Маска глубокого восстановления Total Treat(интенсивный восстанавливающий уход для ослабленных волос)",
      duration: 60,
      price: 490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Восстанавливающий уход 5+Protopak",
      duration: 60,
      price: 490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Сохранение цвета Keep Me Vivid",
      duration: 60,
      price: 690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Глубокий уход и восстановление Biolage(биоуход, подбирается по типу волос)",
      duration: 60,
      price: 690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Уход Бондинг",
      duration: 60,
      price: 1050,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Уход Бондинг в окрашивании",
      duration: 60,
      price: 800,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Уход Бондинг осветление",
      duration: 60,
      price: 1200,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Химическая завивка",
      duration: 60,
      price: 1690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "YBERA FASHION STYLIST CREME(выпрямление и питание волос)",
      duration: 60,
      price: 3290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "YBERA FASHION STYLIST PLATINUM(выпрямление волос)",
      duration: 60,
      price: 3290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "YBERA BOTULINICA CAPILAR(омоложение волос)",
      duration: 60,
      price: 3290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "YBERA SPA процедура Интенсивное увлажнение",
      duration: 60,
      price: 1990,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Укладка(длина волос до 25 см)",
      duration: 60,
      price: 590,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "Укладка(длина волос от 25 см)",
      duration: 60,
      price: 790,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "Коктейльная прическа(1 час)",
      duration: 60,
      price: 990,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "Свадебная прическа",
      duration: 60,
      price: 2490,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "Простое плетение(1 коса)",
      duration: 60,
      price: 250,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "Сложное плетение(1 коса)",
      duration: 60,
      price: 350,
      masterId: 3,
      serviceCategoryId: 8
  },
  {
      title: "MONE Professional Окрашивание корней (до 2 см)",
      duration: 60,
      price: 1390,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Окрашивание (в один тон)",
      duration: 60,
      price: 1490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Тонирование (в один тон)",
      duration: 60,
      price: 1690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Тонирование (в составе другой услуги)",
      duration: 60,
      price: 1490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Мелирование -и",
      duration: 60,
      price: 1350,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Мелирование Т-зоны",
      duration: 60,
      price: 2550,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Мелирование половины головы",
      duration: 60,
      price: 2690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Мелирование всей головы",
      duration: 60,
      price: 3890,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Блондирование корней (до 2 см)",
      duration: 60,
      price: 1650,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Блондирование длины",
      duration: 60,
      price: 2590,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MONE Professional Блондирование на фольгу",
      duration: 60,
      price: 4690,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Окрашивание корней (до 2 см)",
      duration: 60,
      price: 1550,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Окрашивание (в один тон)",
      duration: 60,
      price: 1650,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Тонирование (в один тон)",
      duration: 60,
      price: 1850,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Тонирование (в составе другой услуги)",
      duration: 60,
      price: 1650,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Мелирование -и",
      duration: 60,
      price: 1490,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Мелирование Т-зоны",
      duration: 60,
      price: 2800,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Мелирование половины головы",
      duration: 60,
      price: 2950,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Мелирование всей головы",
      duration: 60,
      price: 4290,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Блондирование корней (до 2 см)",
      duration: 60,
      price: 1800,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Блондирование длины",
      duration: 60,
      price: 2850,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "MATRIX Блондирование на фольгу(до 15 прядей)",
      duration: 60,
      price: 5150,
      masterId: 3,
      serviceCategoryId: 7
  },
  {
      title: "Классический массаж шеи",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж волосистой части головы",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж передней брюшной стенки",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж воротниковой зоны",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж пояснично-крестцовой области",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж двух рук",
      duration: 60,
      price: 1800,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж нижних конечностей",
      duration: 60,
      price: 1900,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж нижней конечности",
      duration: 60,
      price: 2200,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж верхней конечности",
      duration: 60,
      price: 1800,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж шейно-грудного отдела позвоночника (1 сеанс)",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический массаж грудной клетки (1 сеанс)",
      duration: 60,
      price: 2200,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Сегментарный массаж шейно-воротниковой области головы",
      duration: 60,
      price: 2200,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Сегментарный массаж шейно-грудного отдела позвоночника",
      duration: 60,
      price: 1800,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Сегментарный массаж грудного отдела позвоночника",
      duration: 60,
      price: 1250,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Сегментарный массаж пояснично-крестцового области",
      duration: 60,
      price: 1550,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж тазобедренного сустава",
      duration: 60,
      price: 1550,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж коленного сустава",
      duration: 60,
      price: 1100,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж голеностопного сустава",
      duration: 60,
      price: 1100,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж стопы и голени (1 сеанс)",
      duration: 60,
      price: 1100,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Апитерапия (лечебный медовый массаж) (1 сегмент)",
      duration: 60,
      price: 1350,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж шейно-воротниковой зоны",
      duration: 60,
      price: 1550,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Массаж спины",
      duration: 60,
      price: 1800,
      masterId: 6,
      serviceCategoryId: 9
  },
  {
      title: "Классический маникюр",
      duration: 90,
      price: 1200,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Аппаратный маникюр",
      duration: 90,
      price: 1200,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Комбинированный маникюр",
      duration: 90,
      price: 1200,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Сложный маникюр с дополнительной обработкой",
      duration: 90,
      price: 1500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Мужской маникюр",
      duration: 90,
      price: 1700,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Детский маникюр до 10 лет",
      duration: 90,
      price: 600,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Реставрация ногтя",
      duration: 90,
      price: 300,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Экспресс- маникюр уход за кутикулой",
      duration: 90,
      price: 800,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Спа - маникюр ЛЮКС",
      duration: 90,
      price: 2000,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "СПА уход для рук",
      duration: 90,
      price: 2500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Парафинотерапия",
      duration: 90,
      price: 1500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Классический педикюр",
      duration: 90,
      price: 2500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Аппаратный педикюр",
      duration: 90,
      price: 2500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Комбинированный педикюр",
      duration: 90,
      price: 2500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Мужской педикюр",
      duration: 90,
      price: 2800,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Детский педикюр до 10 лет",
      duration: 90,
      price: 800,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Медицинский педикюр 1 степень сложности",
      duration: 90,
      price: 3000,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Медицинский педикюр 2 степень сложности",
      duration: 90,
      price: 3500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Обработка глубокой трещины 1 шт",
      duration: 90,
      price: 250,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция вросшего ногтя",
      duration: 90,
      price: 300,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Удаление вросшего ногтя",
      duration: 90,
      price: 500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Нанесение пластины Флеси Вэб",
      duration: 90,
      price: 500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Установка пластины Ониклип(1шт) 1 степень сложности",
      duration: 90,
      price: 900,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Установка пластины Ониклип(1шт) 2 степень сложности",
      duration: 90,
      price: 1400,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Экспресс педикюр",
      duration: 90,
      price: 1500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Парафинотерапия",
      duration: 90,
      price: 1500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Скраб рук/ног",
      duration: 90,
      price: 1000,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Профессиональный Массаж стоп",
      duration: 90,
      price: 1700,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие гель-лак",
      duration: 90,
      price: 1400,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие гель-лак French",
      duration: 90,
      price: 1700,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Декоративное покрытие в один цвет",
      duration: 90,
      price: 500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Лечебное покрытие",
      duration: 90,
      price: 250,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Снятие лака",
      duration: 90,
      price: 100,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Снятие гель-лака",
      duration: 90,
      price: 400,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Сушка для лака",
      duration: 90,
      price: 100,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Художественное покрытие 1ноготь 1 степень сложности",
      duration: 90,
      price: 50,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Художественное покрытие 1ноготь 2 степень сложности",
      duration: 90,
      price: 350,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Покрытие гель-лак 1 ноготь",
      duration: 90,
      price: 160,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Лечение ногтей IBX (первичное)",
      duration: 90,
      price: 900,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "PI шайн лечебное покрытие",
      duration: 90,
      price: 900,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Дизайн; Моделирование ногтей",
      duration: 90,
      price: 3000,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Дизайн ногтей (стразы) 1 шт",
      duration: 90,
      price: 50,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Снятие био-геля",
      duration: 90,
      price: 700,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Биогель 1 ноготь",
      duration: 90,
      price: 250,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление базой",
      duration: 90,
      price: 500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление биогелем (прозрачный)",
      duration: 90,
      price: 1200,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление гелем",
      duration: 90,
      price: 1500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание ногтей (все)",
      duration: 90,
      price: 3500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание одного ногтя 1 степень сложности",
      duration: 90,
      price: 350,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Наращивание одного ногтя 2 степень сложности",
      duration: 90,
      price: 450,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт 1 ногтя (нарощенного) 1 степень сложности",
      duration: 90,
      price: 350,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт 1 ногтя (нарощенного) 2 степень сложности",
      duration: 90,
      price: 450,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Коррекция наращенных ногтей",
      duration: 90,
      price: 2500,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Снятие нарощенных ногтей",
      duration: 90,
      price: 1000,
      masterId: 7,
      serviceCategoryId: 1
  },
  {
      title: "Стрижка cuture",
      duration: 60,
      price: 2950,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка p-a-p",
      duration: 60,
      price: 2350,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка волос (подравнивание)",
      duration: 60,
      price: 1150,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка женская (стилист)",
      duration: 60,
      price: 2750,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Мытье волос + сушка",
      duration: 60,
      price: 1300,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "ДЕТСКАЯ Стрижка (до 7 лет)",
      duration: 60,
      price: 700,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "ДЕТСКАЯ Стрижка (с 7 до 12 лет)",
      duration: 60,
      price: 1200,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка креативная мужская",
      duration: 60,
      price: 2350,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка мужская",
      duration: 60,
      price: 1800,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка мужская (оформление рисунка) дополнение к услуге",
      duration: 60,
      price: 650,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Экспресс укладка",
      duration: 60,
      price: 1150,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Оформление бороды и усов",
      duration: 60,
      price: 650,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка sur mesur",
      duration: 60,
      price: 2750,
      masterId: 8,
      serviceCategoryId: 7
  },
  {
      title: "Укладка феном длинные волосы",
      duration: 60,
      price: 2200,
      masterId: 8,
      serviceCategoryId: 8
  },
  {
      title: "Укладка феном короткие волосы",
      duration: 60,
      price: 1600,
      masterId: 8,
      serviceCategoryId: 8
  },
  {
      title: "Укладка феном средние волосы",
      duration: 60,
      price: 1800,
      masterId: 8,
      serviceCategoryId: 8
  },
  {
      title: "Глубокое бикини пленочным воском (Glory-epil)",
      duration: 60,
      price: 11750,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Глубокое бикини теплым воском",
      duration: 60,
      price: 9000,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Глубокое бикини полимерным воском",
      duration: 60,
      price: 14850,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Глубокое бикини сахарной пастой (шугаринг)",
      duration: 60,
      price: 9450,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги до пленочным воском (Glory-epil)",
      duration: 60,
      price: 8600,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Абонемент ноги до полимерным воском",
      duration: 60,
      price: 9950,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги до теплым воском",
      duration: 60,
      price: 7000,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги до сахарной пастой (шугаринг)",
      duration: 60,
      price: 7200,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью пленочным воском (Glory-epil)",
      duration: 60,
      price: 15350,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью полимерным воском",
      duration: 60,
      price: 16950,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью теплым воском",
      duration: 60,
      price: 9950,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью сахарной пастой (шугаринг)",
      duration: 60,
      price: 13050,
      masterId: 9,
      serviceCategoryId: 4
  },
  {
      title: "Глубокое бикини",
      duration: 60,
      price: 1450,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Классическое бикини",
      duration: 60,
      price: 900,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ноги полностью",
      duration: 60,
      price: 1750,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ноги до колена (включая колено)",
      duration: 60,
      price: 900,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ноги от колена (включая колено)",
      duration: 60,
      price: 900,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ягодицы",
      duration: 60,
      price: 450,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Руки полностью",
      duration: 60,
      price: 800,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Руки до локтя (включая локоть)",
      duration: 60,
      price: 600,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Подмышечные впадины",
      duration: 60,
      price: 400,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Живот полностью",
      duration: 60,
      price: 600,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Живот до пупка",
      duration: 60,
      price: 350,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Спина полностью",
      duration: 60,
      price: 1000,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Поясница",
      duration: 60,
      price: 500,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Крестцовая область",
      duration: 60,
      price: 350,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Межъягодичная складка",
      duration: 60,
      price: 350,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Грудь",
      duration: 60,
      price: 600,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ореол грудных желез",
      duration: 60,
      price: 300,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Надплечья",
      duration: 60,
      price: 350,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ноздри",
      duration: 60,
      price: 100,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Доп. зоны",
      duration: 60,
      price: 350,
      masterId: 10,
      serviceCategoryId: 4
  },
  {
      title: "Ультразвуковая чистка лица + Электропорация",
      duration: 60,
      price: 3950,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Ультразвуковая чистка лица + Ультрафонофорез",
      duration: 60,
      price: 3800,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Электропорация + Ультрафонофорез (Ультрасоник)",
      duration: 60,
      price: 4150,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Электропорация + Ультрафонофорез (Ультрасоник) + Криолифтинг",
      duration: 60,
      price: 5615,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Карбокситерапия + Ультрафонофорез",
      duration: 60,
      price: 3000,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Ультрасоник + Криолифтинг",
      duration: 60,
      price: 3715,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Электропорация + Криолифтинг",
      duration: 60,
      price: 3865,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Карбокситерапия + Криолифтинг",
      duration: 60,
      price: 3150,
      masterId: 11,
      serviceCategoryId: 3
  },
  {
      title: "Маникюр комби без покрытия",
      duration: 60,
      price: 700,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Маникюр + покрытие",
      duration: 60,
      price: 1400,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Мужской маникюр",
      duration: 60,
      price: 700,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Пигмент на все ногти (втирка/аэрография)",
      duration: 60,
      price: 200,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Дизайн одного ногтя (простой/сложный)",
      duration: 60,
      price: 200,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Инкрустация всего ногтя",
      duration: 60,
      price: 250,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Ремонт одного ногтя акриловым гелем",
      duration: 60,
      price: 150,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Донаращивание ногтя",
      duration: 60,
      price: 180,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Снятие чужого покрытия",
      duration: 60,
      price: 200,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Снятие нарощенных ногтей",
      duration: 60,
      price: 300,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Снятие обычного лака",
      duration: 60,
      price: 150,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Снятие нашего покрытия*",
      duration: 60,
      price: 100,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление 1-го ногтя акриловым гелем",
      duration: 60,
      price: 150,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление ногтей акриловой пудрой 1 ноготь",
      duration: 60,
      price: 35,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Укрепление ногтей акриловой пудрой (все ногти)",
      duration: 60,
      price: 300,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Френч",
      duration: 60,
      price: 250,
      masterId: 12,
      serviceCategoryId: 1
  },
  {
      title: "Миофасциальный массаж",
      duration: 60,
      price: 2200,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вакуумный массаж (лицо + шея) + хромотерапия + воздушно-компрессионный массаж ног",
      duration: 60,
      price: 500,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вакуумный массаж (зона декольте) + хромотерапия + воздушно-компрессионный массаж ног",
      duration: 60,
      price: 350,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вакуумный массаж (бёдра + ягодицы) + хромотерапия",
      duration: 60,
      price: 800,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вакуумный массаж (живот + бока) + хромотерапия",
      duration: 60,
      price: 500,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вакуумный массаж (спина + шея) + хромотерапия",
      duration: 60,
      price: 500,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Вибрационный массаж",
      duration: 60,
      price: 800,
      masterId: 12,
      serviceCategoryId: 9
  },
  {
      title: "Аппаратный педикюр (стопа + пальчики + покрытие)",
      duration: 60,
      price: 2350,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Аппаратный педикюр (стопа + пальчики)",
      duration: 60,
      price: 2000,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Аппаратный педикюр (пальчики + покрытие)",
      duration: 60,
      price: 1850,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Аппаратный педикюр (стопа или пальчики)",
      duration: 60,
      price: 1250,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Дизайн 1 ноготь",
      duration: 60,
      price: 200,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Френч",
      duration: 60,
      price: 300,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Ремонт/донаращивание ногтя",
      duration: 60,
      price: 300,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Снятие покрытия",
      duration: 60,
      price: 100,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Сложная стопа",
      duration: 60,
      price: 500,
      masterId: 7,
      serviceCategoryId: 2
  },
  {
      title: "Прическа/укладка вечерняя (длинные волосы свыше 25см)",
      duration: 120,
      price: 3400,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Прическа/укладка вечерняя (короткие волосы до 15см)",
      duration: 90,
      price: 2300,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Прическа/укладка вечерняя (средняя длина от 15 до 25см)",
      duration: 90,
      price: 2800,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Свадебная/торжественная прическа (длинные волосы свыше 25см)",
      duration: 120,
      price: 3900,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Свадебная/торжественная прическа (короткие волосы до 15см)",
      duration: 120,
      price: 2800,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Свадебная/торжественная прическа (средняя длина от 15 до 25см)",
      duration: 120,
      price: 3400,
      masterId: 6,
      serviceCategoryId: 8
  },
  {
      title: "Коррекция бровей",
      duration: 60,
      price: 500,
      masterId: 11,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание бровей Германия/Швейцария",
      duration: 60,
      price: 500,
      masterId: 11,
      serviceCategoryId: 5
  },
  {
      title: "Окрашивание ресниц Германия/Швейцария",
      duration: 60,
      price: 500,
      masterId: 11,
      serviceCategoryId: 5
  },
  {
      title: "Стрижка и укладка феном",
      duration: 1600,
      price: 1500,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка и укладка феном с использованием утюга",
      duration: 2000,
      price: 2350,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка феном",
      duration: 1100,
      price: 1800,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка феном с использованием плойки или утюга",
      duration: 1500,
      price: 650,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка и укладка феном",
      duration: 1800,
      price: 1150,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка и укладка феном с использованием утюга",
      duration: 2500,
      price: 650,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка феном",
      duration: 1400,
      price: 2750,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка ( феном с использованием бигуди или плойки, диффузура и т.д.)",
      duration: 2000,
      price: 2200,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Причёска",
      duration: 3000,
      price: 1600,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Плетение волос",
      duration: 1000,
      price: 1800,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка и укладка феном",
      duration: 2000,
      price: 2350,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка и укладка феном с использованием утюга",
      duration: 3000,
      price: 1800,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка феном",
      duration: 1700,
      price: 650,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Укладка (феном с использованием бигуди или плойки, утюга и тд)",
      duration: 2000,
      price: 1150,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Причёска",
      duration: 3500,
      price: 650,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Плетение волос",
      duration: 1000,
      price: 2750,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Стрижка чёлки",
      duration: 400,
      price: 2200,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Коррекция длины волос",
      duration: 1000,
      price: 1600,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Короткие волосы",
      duration: 1700,
      price: 1800,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Средние волосы",
      duration: 1900,
      price: 2500,
      masterId: 9,
      serviceCategoryId: 7
  },
  {
      title: "Длинные волосы",
      duration: 2300,
      price: 3000,
      masterId: 9,
      serviceCategoryId: 7
  }
]
  })

  const event = await prisma.event.createMany({
    data:
    [
      {
          startDateTime: new Date('2022-08-10 11:00:00.000'),
          startDateForFilter: new Date('2022-08-10'),
          status: "approved",
          clientId: 13,
          masterId: 1,
          serviceItemId: 1
      },
      {
          startDateTime: new Date('2022-08-11 13:00:00.000'),
          startDateForFilter: new Date('2022-08-11'),
          status: "approved",
          clientId: 13,
          masterId: 1,
          serviceItemId: 2
      },
      {
          startDateTime: new Date('2022-08-12 14:30:00.000'),
          startDateForFilter: new Date('2022-08-12'),
          status: "approved",
          clientId: 13,
          masterId: 1,
          serviceItemId: 3
      },
    {
        startDateTime: new Date('2022-08-17 12:30:00.000'),
        startDateForFilter: new Date('2022-08-17'),
        status: "approved",
        clientId: 14,
        masterId: 1,
        serviceItemId: 7
    },
    {
        startDateTime: new Date('2022-08-18 09:30:00.000'),
        startDateForFilter: new Date('2022-08-18'),
        status: "approved",
        clientId: 15,
        masterId: 1,
        serviceItemId: 8
    },
    {
        startDateTime: new Date('2022-08-18 13:00:00.000'),
        startDateForFilter: new Date('2022-08-18'),
        status: "approved",
        clientId: 13,
        masterId: 1,
        serviceItemId: 9
    },
      {
      startDateTime: new Date('2022-08-19 14:00:00.000'),
      startDateForFilter: new Date('2022-08-19'),
      status: "new",
      clientId: 14,
      masterId: 1,
      serviceItemId: 11
      },
      {
        startDateTime: new Date('2022-08-19 14:00:00.000'),
        startDateForFilter: new Date('2022-08-19'),
        status: "new",
        clientId: 14,
        masterId: 2,
        serviceItemId: 52
    },
    {
        startDateTime: new Date('2022-08-20 12:00:00.000'),
        startDateForFilter: new Date('2022-08-20'),
        status: "new",
        clientId: 15,
        masterId: 2,
        serviceItemId: 53
    },
    {
        startDateTime: new Date('2022-08-21 13:00:00.000'),
        startDateForFilter: new Date('2022-08-21'),
        status: "new",
        clientId: 13,
        masterId: 2,
        serviceItemId: 54
    },
    {
        startDateTime: new Date('2022-08-23 17:00:00.000'),
        startDateForFilter: new Date('2022-08-23'),
        status: "new",
        clientId: 14,
        masterId: 2,
        serviceItemId: 55
    },
    ]
  })


  const schedule = await prisma.schedule.createMany({
    data:
    [
      {
          startDateTime: new Date('2022-08-09 09:00:00.000'),
          endDateTime: new Date('2022-08-09 15:00:00.000'),
          startDateForFilter: new Date('2022-08-09'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-10 09:00:00.000'),
          endDateTime: new Date('2022-08-10 17:00:00.000'),
          startDateForFilter: new Date('2022-08-10'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-11 10:00:00.000'),
          endDateTime: new Date('2022-08-11 14:30:00.000'),
          startDateForFilter: new Date('2022-08-11'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-12 09:30:00.000'),
          endDateTime: new Date('2022-08-12 19:00:00.000'),
          startDateForFilter: new Date('2022-08-12'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-13 12:30:00.000'),
          endDateTime: new Date('2022-08-13 14:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-13 16:00:00.000'),
          endDateTime: new Date('2022-08-13 19:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-14 09:00:00.000'),
          endDateTime: new Date('2022-08-14 15:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-16 10:00:00.000'),
          endDateTime: new Date('2022-08-16 16:00:00.000'),
          startDateForFilter: new Date('2022-08-16'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-17 11:00:00.000'),
          endDateTime: new Date('2022-08-17 15:00:00.000'),
          startDateForFilter: new Date('2022-08-17'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-18 09:00:00.000'),
          endDateTime: new Date('2022-08-18 15:00:00.000'),
          startDateForFilter: new Date('2022-08-18'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-19 09:00:00.000'),
          endDateTime: new Date('2022-08-19 17:00:00.000'),
          startDateForFilter: new Date('2022-08-19'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-20 10:00:00.000'),
          endDateTime: new Date('2022-08-20 14:30:00.000'),
          startDateForFilter: new Date('2022-08-20'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-21 09:30:00.000'),
          endDateTime: new Date('2022-08-21 15:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-21 16:30:00.000'),
          endDateTime: new Date('2022-08-21 19:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-22 12:30:00.000'),
          endDateTime: new Date('2022-08-22 14:00:00.000'),
          startDateForFilter: new Date('2022-08-22'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-23 16:00:00.000'),
          endDateTime: new Date('2022-08-23 19:00:00.000'),
          startDateForFilter: new Date('2022-08-23'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-24 09:00:00.000'),
          endDateTime: new Date('2022-08-24 15:30:00.000'),
          startDateForFilter: new Date('2022-08-24'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-25 10:00:00.000'),
          endDateTime: new Date('2022-08-25 16:00:00.000'),
          startDateForFilter: new Date('2022-08-25'),
          masterId: 1
      },
      {
          startDateTime: new Date('2022-08-26 11:00:00.000'),
          endDateTime: new Date('2022-08-26 15:00:00.000'),
          startDateForFilter: new Date('2022-08-26'),
          masterId: 1
      },
      {
        startDateTime: new Date('2022-08-15 11:00:00.000'),
        endDateTime: new Date('2022-08-15 18:00:00.000'),
        startDateForFilter: new Date('2022-08-15'),
        masterId: 1
      },
      {
          startDateTime: new Date('2022-08-09 09:00:00.000'),
          endDateTime: new Date('2022-08-09 15:00:00.000'),
          startDateForFilter: new Date('2022-08-09'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-10 09:00:00.000'),
          endDateTime: new Date('2022-08-10 17:00:00.000'),
          startDateForFilter: new Date('2022-08-10'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-11 10:00:00.000'),
          endDateTime: new Date('2022-08-11 14:30:00.000'),
          startDateForFilter: new Date('2022-08-11'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-12 09:30:00.000'),
          endDateTime: new Date('2022-08-12 19:00:00.000'),
          startDateForFilter: new Date('2022-08-12'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-13 12:30:00.000'),
          endDateTime: new Date('2022-08-13 14:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-13 16:00:00.000'),
          endDateTime: new Date('2022-08-13 19:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-14 09:00:00.000'),
          endDateTime: new Date('2022-08-14 15:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-14 17:00:00.000'),
          endDateTime: new Date('2022-08-14 19:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-17 11:00:00.000'),
          endDateTime: new Date('2022-08-17 15:00:00.000'),
          startDateForFilter: new Date('2022-08-17'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-18 09:00:00.000'),
          endDateTime: new Date('2022-08-18 15:00:00.000'),
          startDateForFilter: new Date('2022-08-18'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-20 10:00:00.000'),
          endDateTime: new Date('2022-08-20 14:30:00.000'),
          startDateForFilter: new Date('2022-08-20'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-21 09:30:00.000'),
          endDateTime: new Date('2022-08-21 15:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-22 12:30:00.000'),
          endDateTime: new Date('2022-08-22 14:00:00.000'),
          startDateForFilter: new Date('2022-08-22'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-23 12:00:00.000'),
          endDateTime: new Date('2022-08-23 19:00:00.000'),
          startDateForFilter: new Date('2022-08-23'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-24 10:30:00.000'),
          endDateTime: new Date('2022-08-24 15:30:00.000'),
          startDateForFilter: new Date('2022-08-24'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-25 10:00:00.000'),
          endDateTime: new Date('2022-08-25 14:00:00.000'),
          startDateForFilter: new Date('2022-08-25'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-26 11:00:00.000'),
          endDateTime: new Date('2022-08-26 15:00:00.000'),
          startDateForFilter: new Date('2022-08-26'),
          masterId: 2
      },
      {
          startDateTime: new Date('2022-08-10 11:00:00.000'),
          endDateTime: new Date('2022-08-10 17:00:00.000'),
          startDateForFilter: new Date('2022-08-10'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-11 10:00:00.000'),
          endDateTime: new Date('2022-08-11 18:30:00.000'),
          startDateForFilter: new Date('2022-08-11'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-12 09:30:00.000'),
          endDateTime: new Date('2022-08-12 19:00:00.000'),
          startDateForFilter: new Date('2022-08-12'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-13 16:30:00.000'),
          endDateTime: new Date('2022-08-13 19:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-13 12:00:00.000'),
          endDateTime: new Date('2022-08-13 14:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-14 10:00:00.000'),
          endDateTime: new Date('2022-08-14 15:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-14 17:00:00.000'),
          endDateTime: new Date('2022-08-14 19:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-17 11:00:00.000'),
          endDateTime: new Date('2022-08-17 15:00:00.000'),
          startDateForFilter: new Date('2022-08-17'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-18 09:00:00.000'),
          endDateTime: new Date('2022-08-18 18:00:00.000'),
          startDateForFilter: new Date('2022-08-18'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-20 11:00:00.000'),
          endDateTime: new Date('2022-08-20 17:30:00.000'),
          startDateForFilter: new Date('2022-08-20'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-21 09:30:00.000'),
          endDateTime: new Date('2022-08-21 15:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-21 16:30:00.000'),
          endDateTime: new Date('2022-08-21 18:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-23 12:00:00.000'),
          endDateTime: new Date('2022-08-23 19:00:00.000'),
          startDateForFilter: new Date('2022-08-23'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-24 10:30:00.000'),
          endDateTime: new Date('2022-08-24 15:30:00.000'),
          startDateForFilter: new Date('2022-08-24'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-25 10:00:00.000'),
          endDateTime: new Date('2022-08-25 15:00:00.000'),
          startDateForFilter: new Date('2022-08-25'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-26 11:00:00.000'),
          endDateTime: new Date('2022-08-26 15:00:00.000'),
          startDateForFilter: new Date('2022-08-26'),
          masterId: 3
      },
      {
          startDateTime: new Date('2022-08-13 16:30:00.000'),
          endDateTime: new Date('2022-08-13 19:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-13 09:00:00.000'),
          endDateTime: new Date('2022-08-13 14:00:00.000'),
          startDateForFilter: new Date('2022-08-13'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-14 11:00:00.000'),
          endDateTime: new Date('2022-08-14 15:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-14 17:00:00.000'),
          endDateTime: new Date('2022-08-14 19:30:00.000'),
          startDateForFilter: new Date('2022-08-14'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-17 10:00:00.000'),
          endDateTime: new Date('2022-08-17 18:00:00.000'),
          startDateForFilter: new Date('2022-08-17'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-18 09:00:00.000'),
          endDateTime: new Date('2022-08-18 18:00:00.000'),
          startDateForFilter: new Date('2022-08-18'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-20 11:00:00.000'),
          endDateTime: new Date('2022-08-20 17:30:00.000'),
          startDateForFilter: new Date('2022-08-20'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-21 09:30:00.000'),
          endDateTime: new Date('2022-08-21 15:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 4
      },
      {
          startDateTime: new Date('2022-08-21 09:30:00.000'),
          endDateTime: new Date('2022-08-21 15:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 5
      },
      {
          startDateTime: new Date('2022-08-21 16:30:00.000'),
          endDateTime: new Date('2022-08-21 19:00:00.000'),
          startDateForFilter: new Date('2022-08-21'),
          masterId: 5
      },
      {
          startDateTime: new Date('2022-08-17 10:00:00.000'),
          endDateTime: new Date('2022-08-17 18:00:00.000'),
          startDateForFilter: new Date('2022-08-17'),
          masterId: 6
      },
      {
          startDateTime: new Date('2022-08-18 09:00:00.000'),
          endDateTime: new Date('2022-08-18 15:00:00.000'),
          startDateForFilter: new Date('2022-08-18'),
          masterId: 6
      },
      {
          startDateTime: new Date('2022-08-20 11:00:00.000'),
          endDateTime: new Date('2022-08-20 17:30:00.000'),
          startDateForFilter: new Date('2022-08-20'),
          masterId: 6
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
