import React from 'react';
import { CalendarDate } from 'types/Calendar';

import Date from 'components/Calendar/Table/Date';

const Week: React.FC<{ week: CalendarDate[]; onClick: React.MouseEventHandler<HTMLButtonElement> }> = (props) => {
  const { week, onClick } = props;
  return (
    <tr>
      {week.map((date) => (
        <Date key={date.date.getTime()} date={date} onClick={onClick} />
      ))}
    </tr>
  );
};

export default Week;
