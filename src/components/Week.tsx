import React from 'react';
import { CalendarDate } from '../types/CalendarMonth';

const Week: React.FC<{ week: CalendarDate[] }> = (props) => {
  const { week } = props;
  return (
    <tr>
      {week.map((date) => (
        <td key={date.date.getTime()}>{date.date.getDate()}</td>
      ))}
    </tr>
  );
};

export default Week;
