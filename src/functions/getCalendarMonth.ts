import { CalendarDate, CalendarMonth } from 'types/Calendar';
import JapaneseHolidays from 'japanese-holidays';
import { Schedule } from 'types/Schedule';
import { getToday } from 'functions/getToday';

const isSunday = (date: Date) => date.getDay() === 0;
const isSaturday = (date: Date) => date.getDay() === 6;
const isHoliday = (date: Date) => isSaturday(date) || isSunday(date) || Boolean(JapaneseHolidays.isHoliday(date));
const afterToday = (currentDate: Date) => currentDate.getTime() >= getToday().getTime();
const isSelected = (currentDate: Date, schedules: Schedule[]) => {
  const haveSchedules = Boolean(schedules.length);
  if (!haveSchedules) return false;
  const selectedDates: Schedule[] = schedules.filter(
    (schedule) =>
      schedule.date.getFullYear() === currentDate.getFullYear() && schedule.date.getMonth() === currentDate.getMonth()
  );
  for (let i = 0; i < selectedDates.length; i++) {
    if (selectedDates[i].date.getTime() === currentDate.getTime()) {
      return true;
    }
  }
  return false;
};

export const getCalendarMonth = (today: Date, schedules: Schedule[] = []) => {
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
    const currentDate = new Date(currentYear, currentMonth, i);
    calendarDates.push({
      date: currentDate,
      active: isSelected(currentDate, schedules),
      disabled: !afterToday(currentDate),
      isHoliday: isHoliday(currentDate)
    });
  }

  // 先月分を日曜まで配列に追加
  if (!isSunday(firstOfMonth)) {
    const yesterday = new Date(firstOfMonth.getTime());
    for (let i = firstOfMonth.getDay(); i > 0; i--) {
      yesterday.setDate(yesterday.getDate() - 1);
      const currentDate = new Date(yesterday.getTime());
      calendarDates.unshift({
        date: currentDate,
        active: isSelected(currentDate, schedules),
        disabled: true,
        isHoliday: isHoliday(currentDate)
      });
    }
  }

  // 来月分を土曜日まで配列に追加
  if (!isSaturday(lastOfMonth)) {
    const tomorrow = new Date(lastOfMonth.getTime());
    for (let i = lastOfMonth.getDay(); i < 6; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      const currentDate = new Date(tomorrow.getTime());
      calendarDates.push({
        date: currentDate,
        active: isSelected(currentDate, schedules),
        disabled: true,
        isHoliday: isHoliday(currentDate)
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
