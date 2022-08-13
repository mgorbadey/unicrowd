//Функция для нахождения начала отображения евента на календаре и длины блока

function eventPositionInCal(eventsArr) {
  //1. нахожу день недели, часы, минуты для отрисовки в компоненте календаря
  // const hourDifferance = 3; //встроенный метод JS для извлечения часов из датывремени почему-то делает +3часа
  const calSlot = 12; //столько span в 1 часе
  const divider = 3600000; //для перевода в часы
  const newData = eventsArr.map((el) => ({
    ...el,
    weekDay:
      new Date(el.startDateTime).getDay() === 0
        ? 7
        : new Date(el.startDateTime).getDay(),
    startMinutes: new Date(el.startDateTime).getMinutes(),
    startHours: new Date(el.startDateTime).getHours(),
    durationHours:
      (new Date(el.endDateTime) - new Date(el.startDateTime)) / divider,
  }));
  //2. вычисляю gridRow и span для отрисовки в компоненте календаря
  const calendData = newData.map((el) => ({
    ...el,
    span: (Math.round(el.durationHours * 2) / 2) * calSlot,
    gridRow:
      el.startMinutes >= 0 && el.startMinutes <= 30
        ? el.startMinutes >= 0 && el.startMinutes < 15
          ? el.startHours * calSlot + 2
          : el.startHours * calSlot + 8
        : el.startMinutes > 30 && el.startMinutes <= 45
        ? el.startHours * calSlot + 8
        : (el.startHours + 1) * calSlot + 2,
  }));
  return calendData
}

module.exports = {eventPositionInCal}
