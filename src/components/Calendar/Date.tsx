import React from 'react';
import { css } from '@emotion/react';
import { CalendarDate } from 'types/Calendar';

const Date: React.FC<{ date: CalendarDate; onClick: React.MouseEventHandler<HTMLButtonElement> }> = (props) => {
  const { date, onClick } = props;
  const styles = {
    base: css({
      color: getColor(date.disabled, date.isHoliday),
      outline: '1px solid #dddddd'
    }),
    activeDate: css({
      backgroundColor: '#D65E72',
      color: '#fff'
    }),
    button: css({
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      height: '100%',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      color: 'inherit'
    })
  };

  return (
    <td css={[styles.base, date.active ? styles.activeDate : '']}>
      <button
        css={styles.button}
        data-timestamp={date.date.getTime()}
        onClick={onClick}
        type="button"
        disabled={date.disabled}
      >
        {date.date.getDate()}
      </button>
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
