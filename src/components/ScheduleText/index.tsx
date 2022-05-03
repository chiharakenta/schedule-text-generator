import { css } from '@emotion/react';
import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';

const ScheduleText: React.FC<{ text: string }> = (props) => {
  const { text } = props;
  const styles = {
    container: css({
      marginTop: '1rem',
      maxWidth: '600px'
    }),
    textarea: css({
      height: '160px'
    }),
    buttonWrapper: css({
      textAlign: 'right'
    }),
    button: css({
      marginTop: '0.4rem',
      padding: '0.5rem 2rem'
    })
  };

  return (
    <Container css={styles.container}>
      <Form.Control css={styles.textarea} as="textarea" defaultValue={text} />
      <div css={styles.buttonWrapper}>
        <Button css={styles.button} variant="outline-primary">
          コピー
        </Button>
      </div>
    </Container>
  );
};

export default ScheduleText;
