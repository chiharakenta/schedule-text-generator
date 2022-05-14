import { FC, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Calendar } from 'components/Calendar/index';
import { ScheduleText } from 'components/ScheduleText';
import { OptionSelectBox } from 'components/Option/index';

import { schedulesState } from 'store/schedulesState';
import { useRecoilValue } from 'recoil';
import { optionState } from 'store/optionState';
import { useSchedulesText } from 'hooks/useSchedulesText';

export const App: FC = () => {
  const schedules = useRecoilValue(schedulesState);
  const option = useRecoilValue(optionState);
  const { schedulesText, createSchedulesText } = useSchedulesText();

  useEffect(() => createSchedulesText(schedules, option), [schedules, option, createSchedulesText]);

  return (
    <div className="App">
      <Calendar />
      <OptionSelectBox />
      <ScheduleText text={schedulesText} />
    </div>
  );
};
