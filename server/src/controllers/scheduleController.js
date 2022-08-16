const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ScheduleController {
async create(req, res, next) {
    try {
      const { 
        startDateTime,
        endDateTime,
        masterId
      } = req.body;

      const schedule = await prisma.schedule.create({                                              // создаем нового пользователя
        data: {
          startDateTime: new Date(`${startDateTime}`),
          endDateTime: new Date(`${endDateTime}`),
          masterId,
        },
      })
      return res.json('Успех');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ScheduleController();