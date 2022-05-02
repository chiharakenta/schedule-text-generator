import React from 'react';
import { css } from '@emotion/react';
import { CalendarDate } from '../types/CalendarMonth';

const Date: React.FC<{ date: CalendarDate }> = (props) => {
  const { date } = props;
  const style = {
    base: css({
      color: getColor(date.disabled, date.isHoliday),
      cursor: 'pointer',
      outline: '1px solid #dddddd',
      paddingTop: '1rem',
      paddingBottom: '1rem'
    }),
    activeDate: css({
      backgroundColor: '#D65E72',
      color: '#fff'
    })
  };

  return (
    <td css={[style.base, date.active ? style.activeDate : '']} key={date.date.getTime()}>
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
