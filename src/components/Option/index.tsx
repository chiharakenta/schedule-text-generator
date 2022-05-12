import { css } from '@emotion/react';
import { FC, memo } from 'react';
import { Container, Form } from 'react-bootstrap';

type Props = {
  selected: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
};

export const Option: FC<Props> = memo((props: Props) => {
  const { selected, setOption } = props;
  const options = [
    {
      label: '日付のみ選択',
      value: 'date'
    },
    {
      label: '日付と開始時刻を選択',
      value: 'startTime'
    }
  ];

  const selectOption: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOption(event.currentTarget.value);
  };

  const styles = {
    container: css({
      maxWidth: '600px',
      marginTop: '1rem'
    })
  };

  return (
    <Container css={styles.container}>
      {options.map((option, index) => (
        <Form.Check
          key={option.value}
          type="radio"
          id={`option${index}`}
          name="option"
          label={option.label}
          value={option.value}
          onChange={selectOption}
          checked={option.value === selected}
        />
      ))}
    </Container>
  );
});
