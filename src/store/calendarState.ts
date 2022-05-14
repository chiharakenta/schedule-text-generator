import { getCalendarMonth } from 'functions/getCalendarMonth';
import { atom } from 'recoil';
import { CalendarMonth } from 'types/Calendar';

export const calendarState = atom<CalendarMonth>({
  key: 'calendarState',
  default: getCalendarMonth(new Date())
});
