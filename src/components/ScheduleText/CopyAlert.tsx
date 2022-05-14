import { FC } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  show: boolean;
};

export const CopyAlert: FC<Props> = (props) => {
  const { show } = props;
  const title = <strong>{window.innerWidth <= 640 ? '日にち候補' : '候補日程'}</strong>;

  return (
    <Alert variant="success" show={show}>
      スケジュールをコピーしました
      <br />
      調整さんの「{title}」に貼り付けてください。
    </Alert>
  );
};
