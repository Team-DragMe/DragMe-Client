import { atom } from 'recoil';

import { getCurrentWeek } from '../utils/getWeek';

export const dayInfo = atom({
  key: 'dayInfo',
  default: '2022-07-20',
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: getCurrentWeek(0),
});

export const weekCount = atom({
  key: 'weekCount',
  default: 0,
});
