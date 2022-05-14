import { useState } from 'react';
import { Option } from 'types/Option';
import { Schedule } from 'types/Schedule';

export const useSchedulesText = () => {
  const [schedulesText, setSchedulesText] = useState('');

  const createSchedulesText = (schedules: Array<Schedule>, option: Option) => {
    const week = ['日', '月', '火', '水', '木', '金', '土'];
    let text = '';
    schedules.forEach((schedule) => {
      const date = `${schedule.date.getFullYear()}/${schedule.date.getMonth() + 1}/${schedule.date.getDate()}`;
      const day = `(${week[schedule.date.getDay()]})`;
      if (option === 'date') text += `${date}${day}\n`;
      if (option === 'startTime') {
        schedule.times.forEach((time) => {
          text += `${date}${day} ${time}:00~\n`;
        });
      }
    });
    setSchedulesText(text);
  };
  return { schedulesText, createSchedulesText };
};
