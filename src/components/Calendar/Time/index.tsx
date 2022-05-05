import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const Time: React.FC<Props> = (props) => {
  const { show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>タイトル</Modal.Title>
      </Modal.Header>
      <Modal.Body>こんにちは</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Time;
