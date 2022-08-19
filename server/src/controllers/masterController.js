const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { eventPositionInCal } = require("../lib/calendarFormating")
const moment = require('moment');
const mailService = require('../service/mail-service')


//получаем все рабочие слоты мастера для календаря
exports.getAllWorkingSlots = async (req, res) => {
  let masterId = req.params.id;
  let startDate = new Date(req.query.startDate);
  let endDate = new Date(req.query.endDate);

  const allWorkingSlots = await prisma.schedule.findMany({
    where: {
      AND: [
        {
          masterId: +masterId,
        },
        {
          startDateForFilter: { gte: startDate },
        },
        {
          startDateForFilter: { lte: endDate },
        },
      ],
    },
  });

  //вычисляем инфу о позиционировании блока в календаре и длине блока
  let eventsForCal = eventPositionInCal(allWorkingSlots)

  res.json(eventsForCal);
};

//получаем все записи мастера
exports.getAllClientEvents = async (req, res) => {
  let masterId = req.params.id;

  let endDate = new Date(req.query.endDate);
  let endDateFormatted = moment(endDate).format("YYYY-MM-DD");

  let startDate = new Date(req.query.startDate);
  let startDateFormatted = moment(startDate).format("YYYY-MM-DD");

  const result = await prisma.$queryRawUnsafe(`select e."id" as "id", e."startDateTime" as "startDateTime", (e."startDateTime" + (si."duration"||' minutes')::interval) as "endDateTime", e."status" as "status", e."clientId" as "clientId", u."username" as "clientName", e."masterId" as "masterId", sc."title" as "serviceCategoryTitle", si."title" as "serviceItemTitle", si."duration" as "serviceItemDuration" from "Event" e left join "ServiceItem" si on e."serviceItemId" = si.id left join "ServiceCategory" sc on sc.id = si."serviceCategoryId" left join "User" u on u.id = e."clientId" where e."masterId" = ${masterId} and e."startDateTime" >= Date('${startDateFormatted}') and (e."startDateTime" + (si."duration"||' minutes')::interval) <= Date('${endDateFormatted}') + (1||' days')::interval`)


  //вычисляем инфу о позиционировании блока в календаре и длине блока
  let allClientEvents = eventPositionInCal(result)

  res.json(allClientEvents);
};

exports.changeStatus = async (req, res) => {
  let eventId = req.params.id;
  let changeEventStatus = await prisma.event.update({
    where: {
      id: +eventId,
    },
    data: {
      status: 'approved',
    },
  })

  //отправка письма-уведомления клиенту о подтверждении записи
  const master = await prisma.user.findMany({ where: { id: Number(changeEventStatus.masterId) } })
  const client = await prisma.user.findMany({ where: { id: Number(changeEventStatus.clientId) } })
  const serviceItem = await prisma.serviceItem.findMany({ where: { id: Number(changeEventStatus.serviceItemId) } })

  await mailService.sendAcceptEventMail(client[0].email, master[0].username, serviceItem[0].title, moment(changeEventStatus.startDateTime).format("YYYY-MM-DD HH:mm"))

  res.sendStatus(200)
};

exports.deleteEvent = async (req, res) => {
  let { id } = req.params;
  const deleteEvent = await prisma.event.delete({
    where: {
      id: +id,
    },
  })

  const master = await prisma.user.findMany({ where: { id: Number(deleteEvent.masterId) } })
  const client = await prisma.user.findMany({ where: { id: Number(deleteEvent.clientId) } })
  const serviceItem = await prisma.serviceItem.findMany({ where: { id: Number(deleteEvent.serviceItemId) } })

  await mailService.sendCancelEventMail(client[0].email, master[0].username, serviceItem[0].title, moment(deleteEvent.startDateTime).format("YYYY-MM-DD HH:mm"), master[0].id)

  res.sendStatus(200)
}

exports.deleteWorkingSlot = async (req, res) => {
  let { id } = req.params;
  const deleteWorkingSlot = await prisma.schedule.delete({
    where: {
      id: +id,
    },
  })
  res.sendStatus(200)
};


exports.getAvailabilityStatus = async (req, res) => {
  let { masterId } = req.params;
  const tryingToFindClientEventsInWorkingSlot = await prisma.event.findMany({
    where: {
      AND: [
        { startDateForFilter: new Date(req.query.date) },
        { masterId: +masterId }
      ]
    },
  });
  // если в таблице с эвентами есть эвент на эту дату, то статус 204 и потом на фронте отказ удаления   
  tryingToFindClientEventsInWorkingSlot.length ? res.sendStatus(204) : res.sendStatus(200)
};

exports.editWorkingSlot = async (req, res) => {
  let { id } = req.params;
  let { startDateTime, endDateTime } = req.body
  const updateWorkingSlot = await prisma.schedule.update({
    where: {
      id: +id
    },
    data: {
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime)
    },
  })

  const wholeUpdatedObj = await prisma.schedule.findMany({
    where: {
      id: +id
    }
  })

  //вычисляем инфу о позиционировании блока в календаре и длине блока
  let eventUpdForCal = eventPositionInCal(wholeUpdatedObj)


  res.send(eventUpdForCal)

}
