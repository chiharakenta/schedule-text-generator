import { css } from '@emotion/react';
import { FC, memo, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { CopyAlert } from './CopyAlert';

type Props = {
  text: string;
};

export const ScheduleText: FC<Props> = memo((props: Props) => {
  const { text } = props;
  const [show, setShow] = useState(false);

  const onClickCopy = () => {
    void navigator.clipboard.writeText(text).then(() => {
      setShow(true);
      setTimeout(() => {
        window.open('https://chouseisan.com/#tab2', '_blank');
        setShow(false);
      }, 3000);
    });
  };

  return (
    <Container css={styles.container}>
      <CopyAlert show={show} />
      <Form.Control css={styles.textarea} as="textarea" defaultValue={text} />
      <div>
        <Button css={styles.button} variant="primary" onClick={onClickCopy}>
          コピー
        </Button>
      </div>
    </Container>
  );
});

const styles = {
  container: css({
    marginTop: '1rem',
    marginBottom: '1rem',
    maxWidth: '600px'
  }),
  textarea: css({
    height: '160px'
  }),
  button: css({
    marginTop: '0.4rem',
    marginRight: '0.4rem',
    padding: '0.5rem 2rem'
  })
};
