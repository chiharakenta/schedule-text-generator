import React from 'react';
import { CalendarMonth } from '../types/CalendarMonth';

const Calendar: React.FC<{ calendar: CalendarMonth }> = (props) => {
  const { calendar } = props;

  return (
    <div id="calendar">
      <h1>
        {calendar.year}年 {calendar.month}月
      </h1>
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
          {calendar.weeks.map((week) => (
            <tr>
              {week.map((date) => (
                <td>{date.date.getDate()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
