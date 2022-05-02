import React from 'react';
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

  return (
    <div id="calendar">
      <h1>
        {calendar.year}年 {calendar.month + 1}月
      </h1>
      <div className="next-prev-button">
        <button type="button" onClick={getPrevCalendar}>
          &lt;
        </button>
        <button type="button" onClick={getNextCalendar}>
          &gt;
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
          {calendar.weeks.map((week, index) => (
            <Week key={weekKey + String(index)} week={week} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
