import { FC, memo } from 'react';
import { Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import { Title } from 'components/Calendar/Title';
import { SwitchingMonthButtons } from 'components/Calendar/SwitchingMonthButtons';
import { Table } from 'components/Calendar/Table';
import { Time } from 'components/Calendar/Time';
import { useRecoilValue } from 'recoil';
import { schedulesState } from 'store/schedulesState';
import { useCalendar } from 'hooks/useCalendar';
import { useCalendarDate } from 'hooks/useCalendarDate';
import { timeModalState } from 'store/timeModalState';

export const Calendar: FC = memo(() => {
  const schedules = useRecoilValue(schedulesState);
  const { calendar, getPrevCalendar, getNextCalendar } = useCalendar();
  const { date, handleClose, times } = useCalendarDate();
  const show = useRecoilValue(timeModalState);

  return (
    <Container id="calendar" css={styles.container}>
      <Title>{`${calendar.year}年 ${calendar.month + 1}月`}</Title>
      <SwitchingMonthButtons
        getPrevCalendar={() => getPrevCalendar(schedules)}
        getNextCalendar={() => getNextCalendar(schedules)}
      />
      <Table calendar={calendar} />
      <Time show={show} handleClose={handleClose} date={date} times={times} />
    </Container>
  );
});

const styles = {
  container: css({
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '600px'
  })
};
