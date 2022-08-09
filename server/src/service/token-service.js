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
  
}

module.exports = new TockenService()