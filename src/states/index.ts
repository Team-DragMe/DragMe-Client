import { atom } from 'recoil';
import { Schedule } from 'src/types';

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
  key: 'dayCount',
  default: 0,
});

export const currentModifyDayPlan = atom({
  key: 'currentModifyDayPlan',
  default: null,
});

// 기본적으로 업데이트 시킬 때 이 atom에 임시 저장 -> cache값 optimistic update (mutation 시에)
export const dailyPlanList = atom({
  key: 'dailyPlanList',
  default: [] as Schedule[],
});

export const reschedulePlanList = atom({
  key: 'reschedulePlanList',
  default: [] as Schedule[],
});

export const routinePlanList = atom({
  key: 'routinePlanList',
  default: [] as Schedule[],
});

export const menuCount = atom({
  key: 'weekInfo',
  default: 'Today',
});
