const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EventController {
async create(req, res, next) {
    try {
      const { 
        startDateTime,
        status,
        clientId,
        masterId,
        serviceItemId,
      } = req.body;

      const event = await prisma.event.create({                                              // создаем нового пользователя
        data: {
          startDateTime: new Date(`${startDateTime}`),
          status,
          clientId,
          masterId,
          serviceItemId
        },
      })
      return res.json('Успех');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();