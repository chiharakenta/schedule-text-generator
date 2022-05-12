import { schedulesState } from 'store/schedulesState';
import { useSetRecoilState } from 'recoil';
import { Schedule } from 'types/Schedule';

export const useAllSchedules = () => {
  const setSchedules = useSetRecoilState(schedulesState);

  const createSchedule = (schedules: Array<Schedule>, date: Date) => {
    const newSchedules = [...schedules, { date, times: [] }];
    newSchedules.sort(sortSchedulesAscending);
    setSchedules(newSchedules);
  };

  const deleteSchedule = (schedules: Array<Schedule>, date: Date) => {
    const newSchedules = [...schedules];
    for (let i = 0; i < newSchedules.length; i++) {
      if (newSchedules[i].date.getTime() === date.getTime()) {
        newSchedules.splice(i, 1);
        newSchedules.sort(sortSchedulesAscending);
        setSchedules(newSchedules);
        return;
      }
    }
  };

  const sortSchedulesAscending = (a: Schedule, b: Schedule) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  };

  return { setSchedules, createSchedule, deleteSchedule };
};
