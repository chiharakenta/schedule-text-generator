import { css } from '@emotion/react';
import { useAllert } from 'hooks/useAllert';
import { useSchedulesText } from 'hooks/useSchedulesText';
import { FC, memo } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';

type Props = {
  text: string;
};

export const ScheduleText: FC<Props> = memo((props: Props) => {
  const { text } = props;
  const { show } = useAllert();
  const { copySchedulesText } = useSchedulesText();

  const onClickCopy = () => copySchedulesText(text);

  return (
    <Container css={styles.container}>
      <Form.Control css={styles.textarea} as="textarea" defaultValue={text} />
      <div>
        <Button css={styles.button} variant="primary" onClick={onClickCopy}>
          コピー
        </Button>
      </div>
      <Alert variant="success" show={show}>
        スケジュールをコピーしました
        <br />
        <a href="https://chouseisan.com/#tab2" target="_blank" rel="noreferrer">
          調整さんの「日にち候補」
        </a>
        に貼り付けてください。
      </Alert>
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
