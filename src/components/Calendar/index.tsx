import { FC, memo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import { Title } from 'components/Calendar/Title';
import { SwitchingMonthButtons } from 'components/Calendar/SwitchingMonthButtons';
import Table from 'components/Calendar/Table';
import { Time } from 'components/Calendar/Time';
import { Schedule } from 'types/Schedule';
import { CalendarMonth, CalendarTime } from 'types/Calendar';
import { getCalendarTimes } from 'functions/getCalendarTimes';
import { useRecoilValue } from 'recoil';
import { schedulesState } from 'store/schedulesState';
import { useAllSchedules } from 'hooks/useAllSchedules';
import { optionState } from 'store/optionState';
import { useCalendar } from 'hooks/useCalendar';

type Props = {
  timeUtils: {
    getSchedule: (date: Date) => Schedule | null;
    getScheduleIndex: (date: Date) => number;
    getTimeIndex: (scheduleIndex: number, time: number) => number;
    addTime: (scheduleIndex: number, time: number) => void;
    removeTime: (scheduleIndex: number, timeIndex: number) => void;
  };
};

export const Calendar: FC<Props> = memo((props: Props) => {
  const { timeUtils } = props;
  const { createSchedule, deleteSchedule } = useAllSchedules();
  const option = useRecoilValue(optionState);
  const schedules = useRecoilValue(schedulesState);

  const { calendar, setCalendar, getPrevCalendar, getNextCalendar } = useCalendar();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialTimes: CalendarTime[] = getCalendarTimes();
  const [times, setTimes] = useState(initialTimes);

  const selectDate = (weekIndex: number, dateIndex: number) => {
    const newCalendar: CalendarMonth = {
      year: calendar.year,
      month: calendar.month,
      weeks: calendar.weeks.slice()
    };
    if (option === 'date') {
      if (newCalendar.weeks[weekIndex][dateIndex].active) {
        newCalendar.weeks[weekIndex][dateIndex].active = false;
        deleteSchedule(schedules, newCalendar.weeks[weekIndex][dateIndex].date);
      } else {
        newCalendar.weeks[weekIndex][dateIndex].active = true;
        createSchedule(schedules, newCalendar.weeks[weekIndex][dateIndex].date);
      }
      setCalendar(newCalendar);
      return;
    }

    if (option === 'startTime') {
      const selectedDate = new Date(calendar.weeks[weekIndex][dateIndex].date.getTime());
      if (newCalendar.weeks[weekIndex][dateIndex].active) {
        setDate(selectedDate);
        renderTime(selectedDate);
        handleShow();
      } else {
        newCalendar.weeks[weekIndex][dateIndex].active = true;
        createSchedule(schedules, newCalendar.weeks[weekIndex][dateIndex].date);
        setDate(selectedDate);
        renderTime(selectedDate);
        handleShow();
      }
      setCalendar(newCalendar);
    }
  };

  const renderTime = (selectedDate: Date) => {
    const schedule = timeUtils.getSchedule(selectedDate);
    const newTimes = initialTimes.slice();

    for (let i = 0; i < newTimes.length; i++) {
      schedule?.times.forEach((scheduleTime) => {
        if (newTimes[i].time === scheduleTime) {
          newTimes[i].active = true;
        }
      });
    }
    setTimes(newTimes);
  };

  return (
    <Container id="calendar" css={styles.container}>
      <Title>{`${calendar.year}年 ${calendar.month + 1}月`}</Title>
      <SwitchingMonthButtons
        getPrevCalendar={() => getPrevCalendar(schedules)}
        getNextCalendar={() => getNextCalendar(schedules)}
      />
      <Table calendar={calendar} selectDate={selectDate} />
      <Time show={show} handleClose={handleClose} date={date} times={times} timeUtils={timeUtils} setTimes={setTimes} />
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
