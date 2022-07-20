import { atom } from 'recoil';

import { getTodayDate } from '../utils/getDate';

export const dayInfo = atom({
  key: 'dateString',
  default: getTodayDate(0),
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: '220713-220719',
});

export const dayCount = atom({
  key: 'weekInfo',
  default: 0,
});
