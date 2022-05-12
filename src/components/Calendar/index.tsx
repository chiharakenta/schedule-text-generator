import { FC, memo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import { Title } from 'components/Calendar/Title';
import { SwitchingMonthButtons } from 'components/Calendar/SwitchingMonthButtons';
import Table from 'components/Calendar/Table';
import { Time } from 'components/Calendar/Time';
import { Schedule } from 'types/Schedule';
import { CalendarMonth, CalendarTime } from 'types/Calendar';
import { getCalendarMonth } from 'functions/getCalendarMonth';
import { getCalendarTimes } from 'functions/getCalendarTimes';
import { useRecoilValue } from 'recoil';
import { schedulesState } from 'store/schedulesState';
import { useAllSchedules } from 'hooks/useAllSchedules';
import { optionState } from 'store/optionState';

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

  const currentMonth = getCalendarMonth(new Date());
  const [calendar, setCalendar] = useState(currentMonth);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialTimes: CalendarTime[] = getCalendarTimes();
  const [times, setTimes] = useState(initialTimes);

  const getPrevCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const prevMonthFirstDate = new Date(calendar.year, calendar.month - 1, 1);
    const prevCalendar = getCalendarMonth(prevMonthFirstDate, schedules);
    setCalendar(prevCalendar);
  };

  const getNextCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nextMonthFirstDate = new Date(calendar.year, calendar.month + 1, 1);
    const nextCalendar = getCalendarMonth(nextMonthFirstDate, schedules);
    setCalendar(nextCalendar);
  };

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

  const styles = {
    container: css({
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: '600px'
    })
  };

  return (
    <Container id="calendar" css={styles.container}>
      <Title>{`${calendar.year}年 ${calendar.month + 1}月`}</Title>
      <SwitchingMonthButtons getPrevCalendar={getPrevCalendar} getNextCalendar={getNextCalendar} />
      <Table calendar={calendar} selectDate={selectDate} />
      <Time show={show} handleClose={handleClose} date={date} times={times} timeUtils={timeUtils} setTimes={setTimes} />
    </Container>
  );
});
