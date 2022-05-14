import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getCalendarTimes } from 'functions/getCalendarTimes';
import { useAllSchedules } from 'hooks/useAllSchedules';
import { calendarState } from 'store/calendarState';
import { calendarTimeState } from 'store/calendarTimeState';
import { timeModalState } from 'store/timeModalState';
import { optionState } from 'store/optionState';
import { CalendarMonth, CalendarWeek, CalendarDate } from 'types/Calendar';
import { Schedule } from 'types/Schedule';
import { timeDateState } from 'store/timeDateState';

export const useCalendarDate = () => {
  const [date, setDate] = useRecoilState(timeDateState);
  const [times, setTimes] = useRecoilState(calendarTimeState);
  const [calendar, setCalendar] = useRecoilState(calendarState);
  const option = useRecoilValue(optionState);
  const { getSchedule } = useAllSchedules();
  const { createSchedule, deleteSchedule } = useAllSchedules();

  const setShow = useSetRecoilState(timeModalState);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectDate = (schedules: Array<Schedule>, weekIndex: number, dateIndex: number) => {
    if (option === 'date') {
      if (calendar.weeks[weekIndex][dateIndex].active) {
        deleteSchedule(schedules, calendar.weeks[weekIndex][dateIndex].date);
        setDateActive(weekIndex, dateIndex, false);
      } else {
        createSchedule(schedules, calendar.weeks[weekIndex][dateIndex].date);
        setDateActive(weekIndex, dateIndex, true);
      }
      return;
    }

    if (option === 'startTime') {
      const selectedDate = new Date(calendar.weeks[weekIndex][dateIndex].date.getTime());
      if (!calendar.weeks[weekIndex][dateIndex].active) {
        setDateActive(weekIndex, dateIndex, true);
        createSchedule(schedules, calendar.weeks[weekIndex][dateIndex].date);
      }
      setDate(selectedDate);
      renderTime(schedules, selectedDate);
      handleShow();
    }
  };

  const renderTime = (schedules: Array<Schedule>, selectedDate: Date) => {
    const schedule = getSchedule(schedules, selectedDate) as Schedule;
    const newTimes = [...getCalendarTimes()];

    for (let i = 0; i < newTimes.length; i++) {
      schedule?.times.forEach((scheduleTime) => {
        if (newTimes[i].time === scheduleTime) {
          newTimes[i].active = true;
        }
      });
    }
    setTimes(newTimes);
  };

  const setDateActive = (weekIndex: number, dateIndex: number, active: boolean) => {
    const newDate: CalendarDate = {
      ...calendar.weeks[weekIndex][dateIndex],
      active
    };
    const newWeek = replaceDateAtIndex(calendar.weeks[weekIndex], dateIndex, newDate);
    const newWeeks = replaceWeeksAtIndex(calendar.weeks, weekIndex, newWeek);
    const newCalendar: CalendarMonth = {
      year: calendar.year,
      month: calendar.month,
      weeks: newWeeks as CalendarWeek
    };
    setCalendar(newCalendar);
  };

  const replaceDateAtIndex = (week: Array<CalendarDate>, dateIndex: number, newDate: CalendarDate) => [
    ...week.slice(0, dateIndex),
    newDate,
    ...week.slice(dateIndex + 1)
  ];

  const replaceWeeksAtIndex = (weeks: CalendarWeek, weekIndex: number, newWeek: Array<CalendarDate>) => [
    ...weeks.slice(0, weekIndex),
    newWeek,
    ...weeks.slice(weekIndex + 1)
  ];

  return { date, selectDate, handleClose, times, setTimes };
};
