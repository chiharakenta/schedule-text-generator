import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import { CalendarMonth } from '../types/CalendarMonth';
import Week from './Week';

type Props = {
  calendar: CalendarMonth;
  getNextCalendar: React.MouseEventHandler<HTMLButtonElement>;
  getPrevCalendar: React.MouseEventHandler<HTMLButtonElement>;
};

const Calendar: React.FC<Props> = (props) => {
  const { calendar, getNextCalendar, getPrevCalendar } = props;
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
            <Week key={weekKey + String(index)} week={week} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Calendar;
