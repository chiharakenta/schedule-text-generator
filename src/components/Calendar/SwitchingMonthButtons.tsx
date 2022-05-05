import { css } from '@emotion/react';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  getPrevCalendar: React.MouseEventHandler<HTMLButtonElement>;
  getNextCalendar: React.MouseEventHandler<HTMLButtonElement>;
};

const Title: React.FC<Props> = (props) => {
  const { getPrevCalendar, getNextCalendar } = props;

  const styles = {
    buttonWrapper: css({
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '1rem'
    }),
    button: css({
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    })
  };

  return (
    <div css={styles.buttonWrapper}>
      <Button variant="outline-secondary" css={styles.button} type="button" onClick={getPrevCalendar}>
        &lt;
      </Button>
      <Button variant="outline-secondary" css={styles.button} type="button" onClick={getNextCalendar}>
        &gt;
      </Button>
    </div>
  );
};

export default Title;
