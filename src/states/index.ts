import { atom } from 'recoil';

import { getTodayDate } from '../utils/getDate';
import { getCurrentWeek } from '../utils/getWeek';

export const dayInfo = atom({
  key: 'dateString',
  default: getTodayDate(0),
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: getCurrentWeek(0),
});

export const weekCount = atom({
  key: 'weekCount',
  default: 0,
});

export const dayCount = atom({
  key: 'weekInfo',
  default: 0,
});

export const menuCount = atom({
  key: 'weekInfo',
  default: 'Today',
});
