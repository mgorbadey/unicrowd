require('dotenv').config() // подключение переменных env

const express = require('express') // подключение  express
const morgan = require('morgan') // подключение  morgan
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const errorMiddleware = require('./middlewares/errorMiddleware')

const { PORT, CLIENT_URL } = process.env // получение переменных env
const { dbConnect } = require('../prisma/dbConnect')

const app = express() // создание версии сервера express'a

app.use(cookieParser())
app.use(morgan('dev')) // добавление настроек и инициализация morgan

app.use(express.urlencoded({ extended: true })) // добавление отлова post запросовca.
app.use(express.json()) // парсинг post запросов в json.
const whitelist = [CLIENT_URL]

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin || origin === 'null') {
      return callback(null, true)
    }

    return callback(new Error('Запрещено настройками CORS'))
  },
  optionsSuccessStatus: 200,
  credentials: true, // если планируется обмен кукисами с сервером,
  // не забывайте указывать этот параметр
}

app.use(cors(corsOptions))
app.use('/auth', authRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  dbConnect()
  console.log(`Сервер запущен на порте ${PORT} `)
})
