import { css } from '@emotion/react';
import { FC, memo } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  getPrevCalendar: React.MouseEventHandler<HTMLButtonElement>;
  getNextCalendar: React.MouseEventHandler<HTMLButtonElement>;
};

export const SwitchingMonthButtons: FC<Props> = memo((props: Props) => {
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
});
