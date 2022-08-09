const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

class TockenService {

  //функция генерации пары токенов
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  // функция сохранения рефреш-токена в бд
  async saveToken(userId, { refreshToken }) {
    const tockenData = await prisma.token.findUnique({
      where: { userId },
    })

    if (tockenData) {
      const token = await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      })
      return token
    }
    const token = await prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    })
    return token
  }

  // функция удаления рефреш-токена из бд
  async removeToken(refreshToken) {
    const tokenData = await prisma.token.delete({ where: { refreshToken } })
    return tokenData
  }

  // функция валидации аксесс-токена 
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
// функция валидации рефреш-токена
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
// функция поиска рефреш-токена в бд
  async findToken(refreshToken) {
    const tokenData = await prisma.token.findUnique({ where: { refreshToken } })
    return tokenData
  }

}

module.exports = new TockenService()