const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {eventPositionInCal} = require("../lib/calendarFormating")

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
  let startDate = new Date(req.query.startDate);
  let endDate = new Date(req.query.endDate);
  console.log(startDate,endDate )

  const result = await prisma.$queryRawUnsafe(`select e."id" as "id", e."startDateTime" as "startDateTime", (e."startDateTime" + (si."duration"||' minutes')::interval) as "endDateTime", e."status" as "status", e."clientId" as "clientId", u."username" as "clientName", e."masterId" as "masterId", sc."title" as "serviceCategoryTitle", si."title" as "serviceItemTitle", si."duration" as "serviceItemDuration" from "Event" e left join "ServiceItem" si on e."serviceItemId" = si.id left join "ServiceCategory" sc on sc.id = si."serviceCategoryId" left join "User" u on u.id = e."clientId" where e."masterId" = ${masterId} `)

  const test = await prisma.$queryRawUnsafe(`select * from "Event" where "startDateTime" > '2022-08-18'`)
  console.log('testtesttesttest',test)

  let allClientEvents = eventPositionInCal(result)

  // console.log(allClientEvents)
  
  res.json(allClientEvents);
};



// exports.createWorkingSlot = async (req, res) => {
 
// };
