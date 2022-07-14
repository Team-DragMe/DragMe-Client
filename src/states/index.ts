import { atom } from 'recoil';

import { getToday } from '../utils/getDate';

export const dayInfo = atom({
  key: 'dayInfo',
  default: getToday(0),
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: '220713-220719',
});
