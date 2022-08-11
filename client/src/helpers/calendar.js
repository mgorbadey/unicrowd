//2.  Функция для получения номера недели в году
function getWeekNumber(dt) {
  let tdt = new Date(dt.valueOf());
  let dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  let firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

//3. Получаем дни около текущей даты до и после по 6 шт.
//И сразу выбираем только те, что в нужной нам неделе

function getDaysAroundGivenDay(dt) {
  let daysBefore = [];
  let daysAfter = [];
  let startDateWeek = getWeekNumber(new Date(dt));
  for (let i = 0; i < 7; i++) {
    let startDate = new Date(dt);
    let oneDateNext = startDate.setDate(startDate.getDate() + i);
    let oneDateOnlyDayNumber = new Date(oneDateNext).getDate()
    let oneDateWeek = getWeekNumber(new Date(oneDateNext))
    if (oneDateWeek === startDateWeek) {
      daysAfter.push([oneDateOnlyDayNumber,new Date(oneDateNext)]);
    }
  }

  for (let i = 6; i > 0; i--) {
    let startDate = new Date(dt);
    let oneDateBefore = startDate.setDate(startDate.getDate() - i);
    let oneDateOnlyDayNumber = new Date(oneDateBefore).getDate()

    let oneDateWeek = getWeekNumber(new Date(oneDateBefore))
    if (oneDateWeek === startDateWeek) {
      daysBefore.push([oneDateOnlyDayNumber, new Date(oneDateBefore)]);
    }
  }
  let allDates = daysBefore.concat(daysAfter);
  return allDates;
}

module.exports = router;
