import { css } from '@emotion/react';
import React from 'react';
import { CalendarMonth } from 'types/Calendar';
import Week from 'components/Calendar/Table/Week';

type Props = {
  calendar: CalendarMonth;
  selectDate: (weekIndex: number, dateIndex: number) => void;
};

const Table: React.FC<Props> = (props) => {
  const { calendar, selectDate } = props;

  const styles = {
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
    <table css={styles.table}>
      <tbody>
        <tr>
          <th css={styles.tableHeading}>日</th>
          <th css={styles.tableHeading}>月</th>
          <th css={styles.tableHeading}>火</th>
          <th css={styles.tableHeading}>水</th>
          <th css={styles.tableHeading}>木</th>
          <th css={styles.tableHeading}>金</th>
          <th css={styles.tableHeading}>土</th>
        </tr>
        {calendar.weeks.map((week, index) => (
          <Week
            key={`${String(calendar.year)}-${String(calendar.month)}-${String(index)}`}
            week={week}
            weekIndex={index}
            onClick={selectDate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
