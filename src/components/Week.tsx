import React from 'react';
import { CalendarDate } from '../types/CalendarMonth';

import Date from './Date';

const Week: React.FC<{ week: CalendarDate[] }> = (props) => {
  const { week } = props;
  return (
    <tr>
      {week.map((date) => (
        <Date key={date.date.getTime()} date={date} />
      ))}
    </tr>
  );
};

export default Week;
