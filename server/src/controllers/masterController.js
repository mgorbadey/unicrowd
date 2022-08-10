const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllWorkingSlots = async (req, res) => {
  const allWorkingSlots = await prisma.schedule.findMany();
  //1. нахожу день недели, часы, минуты для отрисовки в компоненте календаря
  const hourDifferance = 3; //встроенный метод JS для извлечения часов из датывремени почему-то делает +3часа
  const calSlot = 12; //столько span в 1 часе
  const divider = 3600000; //для перевода в чаты
  const newData = allWorkingSlots.map((el) => ({
    ...el,
    weekDay:
      new Date(el.startDateTime).getDay() === 0
        ? 7
        : new Date(el.startDateTime).getDay(),
    startMinutes: new Date(el.startDateTime).getMinutes(),
    startHours: new Date(el.startDateTime).getHours() - hourDifferance,
    durationHours: (new Date(el.endDateTime) - new Date(el.startDateTime))/divider,
  }));
  //2. вычисляю gridRow и span для отрисовки в компоненте календаря
  const calendData = newData.map((el) => ({...el,
    span: (Math.round(el.durationHours*2)/2) * calSlot,   
    gridRow: (el.startMinutes >= 0 && el.startMinutes <=30) 
    ? 
    ((el.startMinutes >= 0 && el.startMinutes <15) ? (el.startHours*calSlot+2) : (el.startHours*calSlot+8)) 
    :
    ((el.startMinutes > 30 && el.startMinutes <=45) ? (el.startHours*calSlot+8) : ((el.startHours+1)*calSlot+2)),
  }));

  // console.log('newData',newData);
  // console.log('calendData',calendData);

  res.json(calendData);
};

exports.createWorkingSlot = async (req, res) => {
  // const {id, isDone} = req.body
  // const updateStatus = await prisma.todo.update({
  //   where: {
  //     id: id,
  //   },
  //   data: {
  //     isDone: !isDone,
  //   },
  // })
  // res.sendStatus(200)
};
