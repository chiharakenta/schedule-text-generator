import { getCalendarMonth } from 'functions/getCalendarMonth';
import { getToday } from 'functions/getToday';
import { atom } from 'recoil';
import { CalendarMonth } from 'types/Calendar';

const today = getToday();

export const calendarState = atom<CalendarMonth>({
  key: 'calendarState',
  default: getCalendarMonth(today)
});
