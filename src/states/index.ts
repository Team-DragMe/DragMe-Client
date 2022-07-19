import { atom } from 'recoil';
import { Schedule } from 'src/types';

export const dayInfo = atom({
  key: 'dayInfo',
  default: '2022-07-20',
});

export const weekInfo = atom({
  key: 'weekInfo',
  default: '220713-220719',
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
