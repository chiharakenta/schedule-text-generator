import { calendarState } from 'store/calendarState';
import { useRecoilState } from 'recoil';
import { getCalendarMonth } from 'functions/getCalendarMonth';
import { Schedule } from 'types/Schedule';

export const useCalendar = () => {
  const [calendar, setCalendar] = useRecoilState(calendarState);

  const getPrevCalendar = (schedules: Array<Schedule>) => {
    const prevMonthFirstDate = new Date(calendar.year, calendar.month - 1, 1);
    const prevCalendar = getCalendarMonth(prevMonthFirstDate, schedules);
    setCalendar(prevCalendar);
  };

  const getNextCalendar = (schedules: Array<Schedule>) => {
    const nextMonthFirstDate = new Date(calendar.year, calendar.month + 1, 1);
    const nextCalendar = getCalendarMonth(nextMonthFirstDate, schedules);
    setCalendar(nextCalendar);
  };

  return { calendar, setCalendar, getPrevCalendar, getNextCalendar };
};
