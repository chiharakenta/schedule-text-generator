import React from 'react';
import { CalendarDate } from '../types/CalendarMonth';

const Date: React.FC<{ date: CalendarDate }> = (props) => {
  const { date } = props;
  const style = {
    color: getColor(date.disabled, date.isHoliday)
  };

  return (
    <td style={style} key={date.date.getTime()}>
      {date.date.getDate()}
    </td>
  );
};

const getColor = (disabled: boolean, isHoliday: boolean) => {
  const color = {
    normal: 'inherit',
    holiday: 'red',
    disabled: '#ccc'
  };
  if (disabled) return color.disabled;
  if (!disabled && isHoliday) return color.holiday;
  return color.normal;
};

export default Date;
