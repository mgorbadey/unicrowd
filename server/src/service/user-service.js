const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')
const serverError = require('../exeptions/server-error');

class UserService {

  // функция регистрации
  async registration(email, password, username, role) {
    try {
      const candidate = await prisma.user.findUnique({ where: { email } })                 // узнаем есть ли пользователь с таким мылом
      if (candidate) {
        throw serverError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
      }
      const hashPassword = await bcrypt.hash(password, 3)                                  // хэшируем пароль
      const activationLink = uuid.v4()                                                     // генерим уникальную стрингу для ссылки активации
      const user = await prisma.user.create({                                              // создаем нового пользователя
        data: {
          email,
          password: hashPassword,
          username,
          role,
          activationLink: `http://localhost:3500/auth/activate/${activationLink}`,
          isActivated: false,
        },
      })
      await mailService.sendActivationMail(email, `http://localhost:3500/auth/activate/${activationLink}`) // отправляем письмо с ссылкой активации
      const userDto = new UserDto(user)  // в DataTransferObject (Dto) кладём ту инфу, которую можем отправить на фронт (очищенную от приватной инфы)
      const tokens = tokenService.generateTokens({ ...userDto })                            // генерируем аксес и рефреш токены
      await tokenService.saveToken(userDto.id, tokens.refreshToken) //записываем рефреш токен в бд
      return { ...tokens, user: userDto } // в результате регистрации возвращаем токены и информацию о юзере

    } catch (error) {
      throw serverError.BadRequest('Ошибка регистрации')
    }
  }
  // функция активации аккаунта 
  async activate(link) {
    try {
      const user = await prisma.user.findUnique({  // ищем юзера с пришедшей ссылкой
        where: {
          activationLink: `http://localhost:3500/auth/activate/${link}`,
        },
      })
      if (!user) {
        throw serverError.BadRequest('Неккоректная ссылка активации') // если такого юзера нет - выдаём ошибку
      }
      await prisma.user.update({  // апдейтим поле isActivated
        where: { id: user.id },
        data: { isActivated: true },
      })
    } catch (error) {
      throw serverError.BadRequest('Ошибка активации')
    }
  }

    // функция логина
    async login(email, password) {
      try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
          throw serverError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
          throw serverError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
  
        const tokens = tokenService.generateTokens({ ...userDto })
  
        await tokenService.saveToken(userDto.id, tokens)
        return { ...tokens, user: userDto }
      } catch (error) {
        throw serverError.BadRequest('Ошибка входа')
      }
    }

    // функция логаута
    async logout(refreshToken) {
      try {
        const token = await tokenService.removeToken(refreshToken)
        return token
      } catch (error) {
        throw serverError.BadRequest('Ошибка выхода')
      }
    }

    // функция обновления токена
    async refresh(refreshToken) {
      try {
        if (!refreshToken) {
          throw serverError.UnauthorizedError()
        }
      const userData = tokenService.validateRefreshToken(refreshToken)
      const tokenFromDb = await tokenService.findToken(refreshToken)
      if (!userData || !tokenFromDb) {
        throw serverError.UnauthorizedError()
      }
      const user = await prisma.user.findUnique({ where: { id: userData.id } })
      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({ ...userDto })

      await tokenService.saveToken(userDto.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
      } catch (error) {
        throw serverError.BadRequest('Ошибка обновления токена')
      }
    }

}

module.exports = new UserService()