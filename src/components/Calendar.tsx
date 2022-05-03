import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import Week from './Week';
import getCalendarMonth from '../functions/getCalendarMonth';
import { CalendarMonth } from '../types/CalendarMonth';

type Props = {
  createSchedule: (date: Date) => void;
  deleteSchedule: (date: Date) => void;
};

const Calendar: React.FC<Props> = (props) => {
  const { createSchedule, deleteSchedule } = props;
  const currentMonth = getCalendarMonth(new Date());
  const [calendar, setCalendar] = useState(currentMonth);

  const getPrevCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const prevMonthFirstDate = new Date(calendar.year, calendar.month - 1, 1);
    const prevCalendar = getCalendarMonth(prevMonthFirstDate);
    setCalendar(prevCalendar);
  };

  const getNextCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nextMonthFirstDate = new Date(calendar.year, calendar.month + 1, 1);
    const nextCalendar = getCalendarMonth(nextMonthFirstDate);
    setCalendar(nextCalendar);
  };

  const selectDate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const newCalendar: CalendarMonth = {
      year: calendar.year,
      month: calendar.month,
      weeks: calendar.weeks.slice()
    };

    for (let i = 0; i < newCalendar.weeks.length; i++) {
      for (let j = 0; j < newCalendar.weeks[i].length; j++) {
        const dateTime = newCalendar.weeks[i][j].date.getTime();
        if (String(dateTime) === event.currentTarget.dataset.timestamp) {
          if (newCalendar.weeks[i][j].active) {
            newCalendar.weeks[i][j].active = false;
            deleteSchedule(newCalendar.weeks[i][j].date);
          } else {
            newCalendar.weeks[i][j].active = true;
            createSchedule(newCalendar.weeks[i][j].date);
          }
          setCalendar(newCalendar);
          return;
        }
      }
    }
  };

  const weekKey = `${String(calendar.year)}-${String(calendar.month)}-`;

  const style = {
    container: {
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: '600px'
    },
    buttonWrapper: css({
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '1rem'
    }),
    button: css({
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    }),
    table: css({
      width: '100%',
      textAlign: 'center',
      outline: '2px solid #ddd',
      borderCollapse: 'collapse'
    }),
    tableHeading: css({
      outline: '1px solid #dddddd'
    })
  };

  return (
    <Container id="calendar" css={style.container}>
      <h1>
        {calendar.year}年 {calendar.month + 1}月
      </h1>
      <div css={style.buttonWrapper}>
        <Button variant="outline-secondary" css={style.button} type="button" onClick={getPrevCalendar}>
          &lt;
        </Button>
        <Button variant="outline-secondary" css={style.button} type="button" onClick={getNextCalendar}>
          &gt;
        </Button>
      </div>
      <table css={style.table}>
        <tbody>
          <tr>
            <th css={style.tableHeading}>日</th>
            <th css={style.tableHeading}>月</th>
            <th css={style.tableHeading}>火</th>
            <th css={style.tableHeading}>水</th>
            <th css={style.tableHeading}>木</th>
            <th css={style.tableHeading}>金</th>
            <th css={style.tableHeading}>土</th>
          </tr>
          {calendar.weeks.map((week, index) => (
            <Week key={weekKey + String(index)} week={week} onClick={selectDate} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Calendar;
