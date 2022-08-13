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
exports.getAllEvents = async (req, res) => {
  // let masterId = req.params.id;
  let masterId = 1;

  // const result = await prisma.$queryRawUnsafe('SELECT * FROM "Schedule" where masterId = +1')
  // console.log('resultresultresultresultresult',result)




  // let startDate = new Date(req.query.startDate);
  // let endDate = new Date(req.query.endDate);
  // const allWorkingSlots = await prisma.schedule.findMany({
  //   where: {
  //     AND: [
  //       {
  //         masterId: +masterId,
  //       },
  //       {
  //         startDateTime: { gte: startDate },
  //       },
  //       {
  //         startDateTime: { lte: endDate },
  //       },
  //     ],
  //   },
  // });
  
  // //вычисляем инфу о позиционировании блока в календаре и длине блока
  // let eventsForCal = eventPositionInCal(allWorkingSlots)
  
  // res.json(eventsForCal);
};



// exports.createWorkingSlot = async (req, res) => {
 
// };
