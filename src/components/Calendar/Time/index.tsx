import { css } from '@emotion/react';
import { useCalendarTime } from 'hooks/useCalendarTime';
import { FC, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { schedulesState } from 'store/schedulesState';
import { CalendarTime } from 'types/Calendar';

const week = ['日', '月', '火', '水', '木', '金', '土'];

type Props = {
  show: boolean;
  handleClose: () => void;
  date: Date;
  times: CalendarTime[];
};

export const Time: FC<Props> = memo((props: Props) => {
  const { show, handleClose, date, times } = props;
  const schedules = useRecoilValue(schedulesState);
  const { selectTime } = useCalendarTime();

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
            onClick={(event) => selectTime(event, schedules, index)}
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
