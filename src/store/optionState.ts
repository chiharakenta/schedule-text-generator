import { atom } from 'recoil';
import { Option } from 'types/Option';

export const optionState = atom<Option>({
  key: 'optionState',
  default: 'date'
});
