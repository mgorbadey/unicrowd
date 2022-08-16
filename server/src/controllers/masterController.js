const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ['query'],
});
const {eventPositionInCal} = require("../lib/calendarFormating")
const moment = require('moment');

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
          startDateTime: { gte: startDate },
        },
        {
          startDateTime: { lte: endDate },
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
  // let endDateForm = `${endDate.getDate()}-${endDate.getMonth()}`
  // console.log(endDateForm)
  let startDate = new Date(req.query.startDate);
  let startDateFormatted = moment(startDate).format("YYYY-MM-DD");
  // let ar = startDateFormatted.toString()


  console.log(startDate ,startDateFormatted)
  console.log(endDate ,endDateFormatted)


  // const result = await prisma.$queryRawUnsafe(`select e."id" as "id", e."startDateTime" as "startDateTime", (e."startDateTime" + (si."duration"||' minutes')::interval) as "endDateTime", e."status" as "status", e."clientId" as "clientId", u."username" as "clientName", e."masterId" as "masterId", sc."title" as "serviceCategoryTitle", si."title" as "serviceItemTitle", si."duration" as "serviceItemDuration" from "Event" e left join "ServiceItem" si on e."serviceItemId" = si.id left join "ServiceCategory" sc on sc.id = si."serviceCategoryId" left join "User" u on u.id = e."clientId" where e."masterId" = ${masterId} and e."startDateTime" >= Date('${startDateFormatted}') and (e."startDateTime" + (si."duration"||' minutes')::interval) <= Date('${endDateFormatted}') + (1||' days')::interval`)
  const result = []
  // console.log(result)

  let allClientEvents = eventPositionInCal(result)

  // console.log(allClientEvents)
  
  res.json(allClientEvents);
};

exports.changeStatus = async (req, res) => {
  let eventId  = req.params.id;
  let changeEventStatus = await prisma.event.update({
    where: {
      id: +eventId,
    },
    data: {
      status: 'approved',
    },
  })
  res.sendStatus(200)
};

exports.deleteEvent = async (req, res) => {
  console.log('milamilamila', req.params)
  let {id} = req.params;
  const deleteEvent = await prisma.event.delete({
    where: {
      id: +id,
    },
  })
  res.sendStatus(200)
}

// exports.createWorkingSlot = async (req, res) => {
 
// };
