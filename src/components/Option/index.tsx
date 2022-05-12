import { css } from '@emotion/react';
import { ChangeEvent, FC, memo } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { optionState } from 'store/optionState';
import { Option } from 'types/Option';

export const OptionSelectBox: FC = memo(() => {
  const [selectedOption, setSelectedOption] = useRecoilState(optionState);

  type OptionType = {
    label: string;
    value: Option;
  };
  const options: Array<OptionType> = [
    {
      label: '日付のみ選択',
      value: 'date'
    },
    {
      label: '日付と開始時刻を選択',
      value: 'startTime'
    }
  ];

  const onClickSelectOption = (event: ChangeEvent<HTMLInputElement> & { target: { value: Option } }) =>
    setSelectedOption(event.target.value);

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
          onChange={onClickSelectOption}
          checked={option.value === selectedOption}
        />
      ))}
    </Container>
  );
});

const styles = {
  container: css({
    maxWidth: '600px',
    marginTop: '1rem'
  })
};
