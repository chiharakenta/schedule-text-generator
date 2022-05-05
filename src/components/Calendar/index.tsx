import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { css } from '@emotion/react';
import getCalendarMonth from 'functions/getCalendarMonth';
import { CalendarMonth, CalendarTime } from 'types/Calendar';
import Title from 'components/Calendar/Title';
import SwitchingMonthButtons from 'components/Calendar/SwitchingMonthButtons';
import Table from 'components/Calendar/Table';
import Time from 'components/Calendar/Time';
import { Schedule } from 'types/Schedule';
import getCalendarTimes from 'functions/getCalendarTimes';

type Props = {
  schedules: Schedule[];
  option: string;
  createSchedule: (date: Date) => void;
  deleteSchedule: (date: Date) => void;
  timeUtils: {
    getSchedule: (date: Date) => Schedule | null;
    getScheduleIndex: (date: Date) => number;
    getTimeIndex: (scheduleIndex: number, time: number) => number;
    addTime: (scheduleIndex: number, time: number) => void;
    removeTime: (scheduleIndex: number, timeIndex: number) => void;
  };
};

const Calendar: React.FC<Props> = (props) => {
  const { schedules, option, createSchedule, deleteSchedule, timeUtils } = props;
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

  const selectDate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (option === 'date') {
      const newCalendar: CalendarMonth = {
        year: calendar.year,
        month: calendar.month,
        weeks: calendar.weeks.slice()
      };

      for (let i = 0; i < newCalendar.weeks.length; i++) {
        for (let j = 0; j < newCalendar.weeks[i].length; j++) {
          const dateTime = newCalendar.weeks[i][j].date.getTime();
          if (String(dateTime) === event.currentTarget.dataset.timestamp) {
            if (newCalendar.weeks[i][j].active) {
              newCalendar.weeks[i][j].active = false;
              deleteSchedule(newCalendar.weeks[i][j].date);
            } else {
              newCalendar.weeks[i][j].active = true;
              createSchedule(newCalendar.weeks[i][j].date);
            }
            setCalendar(newCalendar);
            return;
          }
        }
      }
    }

    if (option === 'startTime') {
      const newCalendar: CalendarMonth = {
        year: calendar.year,
        month: calendar.month,
        weeks: calendar.weeks.slice()
      };

      for (let i = 0; i < newCalendar.weeks.length; i++) {
        for (let j = 0; j < newCalendar.weeks[i].length; j++) {
          const dateTime = newCalendar.weeks[i][j].date.getTime();
          const selectedDate = new Date(Number(event.currentTarget.dataset.timestamp));
          if (String(dateTime) === event.currentTarget.dataset.timestamp) {
            if (newCalendar.weeks[i][j].active) {
              setDate(selectedDate);
              renderTime(selectedDate);
              handleShow();
            } else {
              newCalendar.weeks[i][j].active = true;
              createSchedule(newCalendar.weeks[i][j].date);
              setDate(selectedDate);
              renderTime(selectedDate);
              handleShow();
            }
            setCalendar(newCalendar);
            return;
          }
        }
      }
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
      <Title title={`${calendar.year}年 ${calendar.month + 1}月`} />
      <SwitchingMonthButtons getPrevCalendar={getPrevCalendar} getNextCalendar={getNextCalendar} />
      <Table calendar={calendar} selectDate={selectDate} />
      <Time show={show} handleClose={handleClose} date={date} times={times} timeUtils={timeUtils} />
    </Container>
  );
};

export default Calendar;
