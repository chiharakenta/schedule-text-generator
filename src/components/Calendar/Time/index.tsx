import { css } from '@emotion/react';
import { Dispatch, SetStateAction, FC, memo, MouseEvent } from 'react';
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
  setTimes: Dispatch<SetStateAction<CalendarTime[]>>;
};

export const Time: FC<Props> = memo((props: Props) => {
  const { show, handleClose, date, times, timeUtils, setTimes } = props;

  const selectTime = (event: MouseEvent<HTMLButtonElement>, timeIndex: number) => {
    const { timestamp, time, active } = event.currentTarget.dataset;
    if (typeof timestamp !== 'string' && typeof time !== 'string' && typeof active === 'string') return;

    const isActive = active === 'true';
    if (!isActive) {
      const scheduleIndex = timeUtils.getScheduleIndex(new Date(Number(timestamp)));
      timeUtils.addTime(scheduleIndex, Number(time));
    } else {
      const scheduleIndex = timeUtils.getScheduleIndex(new Date(Number(timestamp)));
      const scheduleTimeIndex = timeUtils.getTimeIndex(scheduleIndex, Number(time));
      timeUtils.removeTime(scheduleIndex, scheduleTimeIndex);
    }

    const newTimes = [...times];
    newTimes[timeIndex].active = !isActive;
    setTimes(newTimes);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${week[date.getDay()]})`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {times.map((time, index) => (
          <Button
            variant="outline-primary"
            css={getButtonStyle(time.active)}
            key={String(date.getTime()) + String(time.time)}
            data-time={time.time}
            data-timestamp={date.getTime()}
            data-active={time.active}
            active={time.active}
            onClick={(event) => selectTime(event, index)}
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
});

const getButtonStyle = (isActive: boolean) => {
  const buttonColor = {
    normal: {
      backgroundColor: '#ffffff',
      color: '#0d6efd'
    },
    active: {
      backgroundColor: '#0d6efd',
      color: '#ffffff'
    }
  };
  return css({
    display: 'block',
    width: '50%',
    minWidth: '80px',
    marginBottom: '0.4rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:hover': isActive ? buttonColor.active : buttonColor.normal
  });
};
