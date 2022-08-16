const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');
const { eventPositionInCal } = require("../lib/calendarFormating")

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
          startDateForFilter: moment(startDateTime).format("YYYY-MM-DD"),
          masterId,
        },
      })

      return res.json(eventPositionInCal([schedule]));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ScheduleController();