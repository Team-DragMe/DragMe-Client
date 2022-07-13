import { atom } from 'recoil';

import { todayTime } from '../utils/getToday';

export const dayInfo = atom({
  key: 'dayInfo',
  default: todayTime(),
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: '220713-220719',
});
