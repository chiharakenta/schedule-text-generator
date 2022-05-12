import { css } from '@emotion/react';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

type Props = {
  text: string;
  setAlertShow: Dispatch<SetStateAction<boolean>>;
};

export const ScheduleText: FC<Props> = memo((props: Props) => {
  const { text, setAlertShow } = props;

  const copyScheduleText: React.MouseEventHandler<HTMLButtonElement> = () => {
    void navigator.clipboard.writeText(text).then(() => {
      setAlertShow(true);
      setTimeout(() => {
        window.open('https://chouseisan.com/#tab2', '_blank');
        setAlertShow(false);
      }, 3500);
    });
  };

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

  return (
    <Container css={styles.container}>
      <Form.Control css={styles.textarea} as="textarea" defaultValue={text} />
      <div>
        <Button css={styles.button} variant="primary" onClick={copyScheduleText}>
          コピー
        </Button>
      </div>
    </Container>
  );
});
