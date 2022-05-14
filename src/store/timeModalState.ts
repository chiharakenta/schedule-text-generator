import { atom } from 'recoil';

export const timeModalState = atom<boolean>({
  key: 'timeModalState',
  default: false
});
