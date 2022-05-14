import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { CalendarDate } from 'types/Calendar';
import { useCalendarDate } from 'hooks/useCalendarDate';
import { useRecoilValue } from 'recoil';
import { schedulesState } from 'store/schedulesState';

type Props = {
  weekIndex: number;
  dateIndex: number;
  date: CalendarDate;
};

export const Date: FC<Props> = memo((props: Props) => {
  const { weekIndex, dateIndex, date } = props;
  const schedules = useRecoilValue(schedulesState);
  const { selectDate } = useCalendarDate();
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
        onClick={() => selectDate(schedules, weekIndex, dateIndex)}
        type="button"
        disabled={date.disabled}
      >
        {date.date.getDate()}
      </button>
    </td>
  );
});

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
