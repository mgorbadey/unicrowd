require('dotenv').config() // подключение переменных env

const express = require('express') // подключение  express
const morgan = require('morgan') // подключение  morgan
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { PORT, CLIENT_URL } = process.env // получение переменных env
const { dbConnect } = require('../prisma/dbConnect')

const app = express() // создание версии сервера express'a
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:3001"],
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(cors(corsOptions))

// импорт роутов
const masterRouter = require('./routes/masterRoute');

app.use(cookieParser())
app.use(morgan('dev')) // добавление настроек и инициализация morgan

app.use(express.urlencoded({ extended: true })) // добавление отлова post запросовca.
app.use(express.json()) // парсинг post запросов в json.
// const whitelist = [CLIENT_URL]



app.use('/masters', masterRouter);
// app.get('/masters', (req, res) => {console.log('URA')})

app.listen(PORT, () => {
  // dbConnect()
  console.log(`Сервер запущен на порте ${PORT}! `)
})
