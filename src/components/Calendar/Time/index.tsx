import { css } from '@emotion/react';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { CalendarTime } from 'types/Calendar';
import { Schedule } from 'types/Schedule';

const week = ['日', '月', '火', '水', '木', '金', '土'];

type Props = {
  show: boolean;
  handleClose: () => void;
  date: Date;
  times: CalendarTime[];
  timeUtils: {
    getSchedule: (date: Date) => Schedule | null;
    getScheduleIndex: (date: Date) => number;
    getTimeIndex: (scheduleIndex: number, time: number) => number;
    addTime: (scheduleIndex: number, time: number) => void;
    removeTime: (scheduleIndex: number, timeIndex: number) => void;
  };
};

const Time: React.FC<Props> = (props) => {
  const { show, handleClose, date, times, timeUtils } = props;

  const styles = {
    button: css({
      display: 'block',
      width: '50%',
      minWidth: '80px',
      marginBottom: '0.4rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    })
  };

  const selectTime: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const { timestamp, time, active } = event.currentTarget.dataset;
    if (typeof timestamp !== 'string' && typeof time !== 'string' && typeof active === 'string') return;

    const isActive = active === 'true';
    if (!isActive) {
      event.currentTarget.classList.add('active');
      const scheduleIndex = timeUtils.getScheduleIndex(new Date(Number(timestamp)));
      timeUtils.addTime(scheduleIndex, Number(time));
    } else {
      event.currentTarget.classList.remove('active');
      const scheduleIndex = timeUtils.getScheduleIndex(new Date(Number(timestamp)));
      const timeIndex = timeUtils.getTimeIndex(scheduleIndex, Number(time));
      timeUtils.removeTime(scheduleIndex, timeIndex);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${week[date.getDay()]})`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {times.map((time) => (
          <Button
            variant="outline-primary"
            css={styles.button}
            key={String(date.getTime()) + String(time.time)}
            data-time={time.time}
            data-timestamp={date.getTime()}
            data-active={time.active}
            active={time.active}
            onClick={selectTime}
          >
            {`${time.time}:00~`}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Time;
