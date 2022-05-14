import { atom } from 'recoil';
import { Schedule } from 'types/Schedule';

export const schedulesState = atom<Array<Schedule>>({
  key: 'schedulesState',
  default: []
});
