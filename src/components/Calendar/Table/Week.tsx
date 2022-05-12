import { FC, memo } from 'react';
import { CalendarDate } from 'types/Calendar';

import { Date } from 'components/Calendar/Table/Date';

type Props = {
  week: CalendarDate[];
  weekIndex: number;
  onClick: (weekIndex: number, dateIndex: number) => void;
};

export const Week: FC<Props> = memo((props: Props) => {
  const { week, weekIndex, onClick } = props;
  return (
    <tr>
      {week.map((date, dateIndex) => (
        <Date key={date.date.getTime()} weekIndex={weekIndex} dateIndex={dateIndex} date={date} onClick={onClick} />
      ))}
    </tr>
  );
});
