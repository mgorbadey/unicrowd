const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')

class UserService {
  async registration(email, password, username, role){
try {
  const candidate = await prisma.user.findUnique({ where: { email } })                 // узнаем есть ли пользователь с таким мылом
  if (candidate) {
    throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
  }
  const hashPassword = await bcrypt.hash(password, 3)                                  // хэшируем пароль
  const activationLink = uuid.v4()                                                     // генерим уникальную стрингу для ссылки активации
  const user = await prisma.user.create({                                              // создаем нового пользователя
    data: {
      email,
      password: hashPassword,
      username,
      role,
      activationLink: `http://localhost:3500/activate/${activationLink}`,
      isActivated: false,
    },
  })
  await mailService.sendActivationMail(email,`http://localhost:3500/activate/${activationLink}`) // отправляем письмо с ссылкой активации
  const userDto = new UserDto(user)  // в DataTransferObject (Dto) кладём ту инфу, которую можем отправить на фронт (очищенную от приватной инфы)
  const tokens = tokenService.generateTokens({ ...userDto })                            // генерируем аксес и рефреш токены
  await tokenService.saveToken(userDto.id, tokens.refreshToken) //записываем рефреш токен в бд
  return {...tokens, user: userDto} // в результате регистрации возвращаем токены и информацию о юзере

} catch (error) {
  
}
  }
}

module.exports = new UserService()