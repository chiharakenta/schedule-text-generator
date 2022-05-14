import { getToday } from 'functions/getToday';
import { atom } from 'recoil';

export const timeDateState = atom<Date>({
  key: 'timeDateState',
  default: getToday()
});
