import { atom } from 'recoil';
import { CalendarTime } from 'types/Calendar';
import { getCalendarTimes } from 'functions/getCalendarTimes';

export const calendarTimeState = atom<Array<CalendarTime>>({
  key: 'calendarTimeState',
  default: getCalendarTimes()
});
