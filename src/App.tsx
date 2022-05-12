import { FC, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Calendar } from 'components/Calendar/index';
import { ScheduleText } from 'components/ScheduleText';
import { OptionSelectBox } from 'components/Option/index';

import { schedulesState } from 'store/schedulesState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { optionState } from 'store/optionState';
import { useSchedulesText } from 'hooks/useSchedulesText';

export const App: FC = () => {
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  const option = useRecoilValue(optionState);
  const { schedulesText, createSchedulesText } = useSchedulesText();

  const getScheduleIndex = (date: Date) => {
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].date.getTime() === date.getTime()) {
        return i;
      }
    }
    return 0;
  };

  const getSchedule = (date: Date) => {
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].date.getTime() === date.getTime()) {
        return schedules[i];
      }
    }
    return null;
  };

  const getTimeIndex = (scheduleIndex: number, time: number) => {
    for (let i = 0; i < schedules[scheduleIndex].times.length; i++) {
      if (schedules[scheduleIndex].times[i] === time) {
        return i;
      }
    }
    return 0;
  };

  const addTime = (scheduleIndex: number, time: number) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].times.push(time);
    newSchedules[scheduleIndex].times.sort(sortTimeAscending);
    setSchedules(newSchedules);
  };

  const removeTime = (scheduleIndex: number, timeIndex: number) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].times.splice(timeIndex, 1);
    newSchedules[scheduleIndex].times.sort(sortTimeAscending);
    setSchedules(newSchedules);
  };

  const sortTimeAscending = (a: number, b: number) => {
    if (a > b) {
      return 1;
    }
    return -1;
  };

  useEffect(() => createSchedulesText(schedules, option), [schedules, option, createSchedulesText]);

  return (
    <div className="App">
      <Calendar timeUtils={{ getSchedule, getScheduleIndex, getTimeIndex, addTime, removeTime }} />
      <OptionSelectBox />
      <ScheduleText text={schedulesText} />
    </div>
  );
};
