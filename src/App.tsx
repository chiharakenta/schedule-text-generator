import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container } from 'react-bootstrap';

import { Calendar } from 'components/Calendar/index';
import { ScheduleText } from 'components/ScheduleText';
import { Option } from 'components/Option/index';
import { css } from '@emotion/react';

import { Schedule } from 'types/Schedule';

export const App: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleText, setScheduleText] = useState('');
  const [show, setShow] = useState(false);
  const [option, setOption] = useState('date');

  const createSchedule = (date: Date) => {
    const newSchedules = [...schedules, { date, times: [] }];
    newSchedules.sort(sortSchedulesAscending);
    setSchedules(newSchedules);
  };

  const deleteSchedule = (date: Date) => {
    const newSchedules = schedules.slice();
    for (let i = 0; i < newSchedules.length; i++) {
      if (newSchedules[i].date.getTime() === date.getTime()) {
        newSchedules.splice(i, 1);
        newSchedules.sort(sortSchedulesAscending);
        setSchedules(newSchedules);
        return;
      }
    }
  };

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
    const newSchedules = schedules.slice();
    newSchedules[scheduleIndex].times.push(time);
    newSchedules[scheduleIndex].times.sort(sortTimeAscending);
    setSchedules(newSchedules);
  };

  const removeTime = (scheduleIndex: number, timeIndex: number) => {
    const newSchedules = schedules.slice();
    newSchedules[scheduleIndex].times.splice(timeIndex, 1);
    newSchedules[scheduleIndex].times.sort(sortTimeAscending);
    setSchedules(newSchedules);
  };

  const createScheduleText = () => {
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
    setScheduleText(text);
  };

  const sortSchedulesAscending = (a: Schedule, b: Schedule) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  };

  const sortTimeAscending = (a: number, b: number) => {
    if (a > b) {
      return 1;
    }
    return -1;
  };

  useEffect(createScheduleText, [schedules, option]);

  return (
    <div className="App">
      <Calendar
        schedules={schedules}
        option={option}
        createSchedule={createSchedule}
        deleteSchedule={deleteSchedule}
        timeUtils={{ getSchedule, getScheduleIndex, getTimeIndex, addTime, removeTime }}
      />
      <Option selected={option} setOption={setOption} />
      <Container css={css({ maxWidth: '600px' })}>
        <Alert variant="success" show={show}>
          スケジュールをコピーしました
          <br />
          <a href="https://chouseisan.com/#tab2" target="_blank" rel="noreferrer">
            調整さんの「日にち候補」
          </a>
          に貼り付けてください。
        </Alert>
      </Container>
      <ScheduleText text={scheduleText} setAlertShow={setShow} />
    </div>
  );
};
