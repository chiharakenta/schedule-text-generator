import { replaceItemAtIndex } from 'functions/replaceItemAtIndex';
import { MouseEvent } from 'react';
import { schedulesState } from 'store/schedulesState';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { Schedule } from 'types/Schedule';
import { calendarTimeState } from 'store/calendarTimeState';
import { CalendarTime } from 'types/Calendar';
import { removeItemAtIndex } from 'functions/removeItemAtIndex';

export const useCalendarTime = () => {
  const setSchedules = useSetRecoilState(schedulesState);
  const [times, setTimes] = useRecoilState(calendarTimeState);

  const getTimeIndex = (schedules: Array<Schedule>, scheduleIndex: number, selectedTime: number) => {
    const index = schedules[scheduleIndex].times.findIndex((time) => time === selectedTime);
    return index;
  };

  const addTime = (schedules: Array<Schedule>, scheduleIndex: number, time: number) => {
    const newSchedule: Schedule = {
      date: schedules[scheduleIndex].date,
      times: [...schedules[scheduleIndex].times, time]
    };
    const newSchedules = replaceItemAtIndex<Schedule>(schedules, scheduleIndex, newSchedule);
    newSchedules[scheduleIndex].times.sort(sortTimeAscending);
    setSchedules(newSchedules);
  };

  const removeTime = (schedules: Array<Schedule>, scheduleIndex: number, timeIndex: number) => {
    const newTimes: Array<number> = removeItemAtIndex<number>(schedules[scheduleIndex].times, timeIndex);
    const newSchedule: Schedule = {
      date: schedules[scheduleIndex].date,
      times: newTimes.sort(sortTimeAscending)
    };
    const newSchedules = replaceItemAtIndex<Schedule>(schedules, scheduleIndex, newSchedule);
    setSchedules(newSchedules);
  };

  const sortTimeAscending = (a: number, b: number) => {
    if (a > b) {
      return 1;
    }
    return -1;
  };

  const getScheduleIndex = (schedules: Array<Schedule>, date: Date) => {
    const index = schedules.findIndex((schedule) => schedule.date.getTime() === date.getTime());
    return index;
  };

  const selectTime = (event: MouseEvent<HTMLButtonElement>, schedules: Array<Schedule>, timeIndex: number) => {
    const { timestamp, time, active } = event.currentTarget.dataset as {
      timestamp: string;
      time: string;
      active: string;
    };

    const isActive = active === 'true';
    if (!isActive) {
      const scheduleIndex = getScheduleIndex(schedules, new Date(parseInt(timestamp, 10)));
      addTime(schedules, scheduleIndex, parseInt(time, 10));
    } else {
      const scheduleIndex = getScheduleIndex(schedules, new Date(parseInt(timestamp, 10)));
      const scheduleTimeIndex = getTimeIndex(schedules, scheduleIndex, parseInt(time, 10));
      removeTime(schedules, scheduleIndex, scheduleTimeIndex);
    }

    const newTime: CalendarTime = {
      time: times[timeIndex].time,
      active: !isActive
    };
    const newTimes = replaceItemAtIndex(times, timeIndex, newTime);
    setTimes(newTimes);
  };

  return { getTimeIndex, addTime, removeTime, selectTime };
};
