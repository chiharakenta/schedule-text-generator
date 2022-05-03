import { CalendarDate, CalendarMonth } from '../types/Calendar';

const isSunday = (date: Date) => date.getDay() === 0;
const isSaturday = (date: Date) => date.getDay() === 6;
const isHoliday = (date: Date) => date.getDay() === 6 || date.getDay() === 0;

const getCalendarMonth = (today: Date) => {
  const calendarMonth: CalendarMonth = {
    year: today.getFullYear(),
    month: today.getMonth(),
    weeks: [[], [], [], [], [], []]
  };
  const calendarDates: CalendarDate[] = [];

  // その月の 月初~月末までを配列に追加
  const firstOfMonth: Date = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastOfMonth: Date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1, 0);
  const currentYear: number = firstOfMonth.getFullYear();
  const currentMonth: number = firstOfMonth.getMonth();
  for (let i = firstOfMonth.getDate(); i <= lastOfMonth.getDate(); i++) {
    const currentDay = new Date(currentYear, currentMonth, i);
    calendarDates.push({
      date: currentDay,
      active: false,
      disabled: false,
      isHoliday: isHoliday(currentDay)
    });
  }

  // 先月分を日曜まで配列に追加
  if (!isSunday(firstOfMonth)) {
    const yesterday = new Date(firstOfMonth.getTime());
    for (let i = firstOfMonth.getDay(); i > 0; i--) {
      yesterday.setDate(yesterday.getDate() - 1);
      const currentDay = new Date(yesterday.getTime());
      calendarDates.unshift({
        date: currentDay,
        active: false,
        disabled: true,
        isHoliday: isHoliday(currentDay)
      });
    }
  }

  // 来月分を土曜日まで配列に追加
  if (!isSaturday(lastOfMonth)) {
    const tomorrow = new Date(lastOfMonth.getTime());
    for (let i = lastOfMonth.getDay(); i < 6; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      const currentDay = new Date(tomorrow.getTime());
      calendarDates.push({
        date: currentDay,
        active: false,
        disabled: true,
        isHoliday: isHoliday(currentDay)
      });
    }
  }
  let weekIndex = 0;
  calendarDates.forEach((date) => {
    calendarMonth.weeks[weekIndex].push(date);
    const day = date.date.getDay();
    const isWeekEnd = day === 6;
    if (isWeekEnd) weekIndex += 1;
  });

  return calendarMonth;
};

export default getCalendarMonth;
