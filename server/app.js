require('dotenv').config() // подключение переменных env

const express = require('express') // подключение  express
const morgan = require('morgan') // подключение  morgan
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const { PORT } = process.env // получение переменных env
const { dbConnect } = require('./prisma/dbConnect')

const app = express() // создание версии сервера express'a

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev')) // добавление настроек и инициализация morgan
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true })) // добавление отлова post запросовca.
// app.use(express.json({ extended: true })) // парсинг post запросов в json.
// app.use('/public/image', express.static(path.join(__dirname, 'public')));

// импорт роутов
const masterRoute = require('./src/routes/masterRoute')
const clientRoute = require('./src/routes/clientRoute')
const uploadRoute = require('./src/routes/uploadRoute')
const authRoute = require('./src/routes/authRoute')
const searchRoute = require('./src/routes/searchRoute')
const resultsRoute = require('./src/routes/resultsRoute')
const eventsRoute = require('./src/routes/eventRoute')

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/masters', masterRoute)
app.use('/clients', clientRoute)
app.use('/auth', authRoute)
app.use('/api', uploadRoute)
app.use('/search', searchRoute)
app.use('/results', resultsRoute)
app.use('/events', eventsRoute)

const errorMiddleware = require('./src/middlewares/errorMiddleware')

app.use(errorMiddleware)

app.listen(PORT, () => {
  dbConnect()
  console.log(`Сервер запущен на порте ${PORT} `)
})
