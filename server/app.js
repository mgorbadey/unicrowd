require('dotenv').config() // подключение переменных env

const express = require('express') // подключение  express
const morgan = require('morgan') // подключение  morgan
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const errorMiddleware = require('./middlewares/errorMiddleware')
const path = require('path')

const { PORT, CLIENT_URL } = process.env // получение переменных env
const { dbConnect } = require('./prisma/dbConnect')

const app = express() // создание версии сервера express'a
app.use(express.json({ extended: true }))
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:3001"],
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev')) // добавление настроек и инициализация morgan

app.use(express.urlencoded({ extended: true })) // добавление отлова post запросовca.
// app.use(express.json({ extended: true })) // парсинг post запросов в json.
// app.use('/public/image', express.static(path.join(__dirname, 'public')));

// импорт роутов
const masterRouter = require('./src/routes/masterRoute');
const masterRoute = require('./src/routes/masterRoute')
const uploadRoute = require('./src/routes/uploadRoute')

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/masters', masterRouter);
app.use('/master', masterRoute)
app.use('/auth', authRouter)
app.use('/api',  uploadRoute)

app.use(errorMiddleware)

app.listen(PORT, () => {
  dbConnect()
  console.log(`Сервер запущен на порте ${PORT} `)
})
