import { atom } from 'recoil';

import { getTodayDate } from '../utils/getDate';

export const dayInfo = atom({
  key: 'dayInfo',
  default: getTodayDate(0),
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: '220713-220719',
});
