import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container } from 'react-bootstrap';

import Calendar from 'components/Calendar/index';
import ScheduleText from 'components/ScheduleText';
import { css } from '@emotion/react';

const App: React.FC = () => {
  const [schedules, setSchedules] = useState<Date[]>([]);
  const [scheduleText, setScheduleText] = useState('');
  const [show, setShow] = useState(false);

  const createSchedule = (date: Date) => {
    const newSchedules = schedules.slice();
    newSchedules.push(date);
    newSchedules.sort(sortAscending);
    setSchedules(newSchedules);
  };

  const deleteSchedule = (date: Date) => {
    const newSchedules = schedules.slice();
    for (let i = 0; i < newSchedules.length; i++) {
      if (newSchedules[i].getTime() === date.getTime()) {
        newSchedules.splice(i, 1);
        newSchedules.sort(sortAscending);
        setSchedules(newSchedules);
        return;
      }
    }
  };

  const createScheduleText = () => {
    const week = ['日', '月', '火', '水', '木', '金', '土'];
    let text = '';
    schedules.forEach((schedule) => {
      const date = `${schedule.getFullYear()}/${schedule.getMonth() + 1}/${schedule.getDate()}`;
      const day = `(${week[schedule.getDay()]})`;
      text += `${date}${day}\n`;
    });
    setScheduleText(text);
  };

  const sortAscending = (a: Date, b: Date) => {
    if (a > b) {
      return 1;
    }
    return -1;
  };

  useEffect(createScheduleText, [schedules]);

  return (
    <div className="App">
      <Alert variant="success" show={show}>
        <Container css={css({ maxWidth: '600px' })}>
          スケジュールをコピーしました
          <br />
          調整さんの「日にち候補」に貼り付けてください。
        </Container>
      </Alert>
      <Calendar schedules={schedules} createSchedule={createSchedule} deleteSchedule={deleteSchedule} />
      <ScheduleText text={scheduleText} setAlertShow={setShow} />
    </div>
  );
};

export default App;
