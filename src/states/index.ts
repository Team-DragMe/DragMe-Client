import { atom } from 'recoil';
import { movePlanChipParams } from 'src/components/common/DayPlanList/DayPlan';
import { dailyPlanFlag, Schedule } from 'src/types';

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

export interface tempData {
  itemId?: string;
  flag?: string;
  date?: string | null;
}
export const currentModifyDayPlan = atom({
  key: 'currentModifyDayPlan',
  default: { itemId: '', flag: '', date: '' } as tempData,
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
  key: 'menuCount',
  default: 'Today',
});

// 체크한 애들 관리 / 열린 애들 관리
export const openedSchedules = atom({
  key: 'openedSchedules',
  default: new Set([]) as Set<string>,
});

export const checkedSchedules = atom({
  key: 'checkedSchedules',
  default: new Set([]) as Set<string>,
});

export const currentDraggintElement = atom({
  key: 'currentDraggintElement',
  default: {} as movePlanChipParams,
});

export const currentHoverFlag = atom({
  key: 'currentHoverFlag',
  default: null as null | dailyPlanFlag,
});

// 1. 내부 애들 확인, hover한 애들 전체적으로 확인
// 이 값이 바뀌면 이걸 키로 useMutation 사용

export const scrollY = atom({
  key: 'scrollY',
  default: 0,
});

export const RoutineBoxIsOpened = atom({
  key: 'RoutineboxIsOpened',
  default: false,
});

export const modalClickXY = atom({
  key: 'modalClickXY',
  default: { posX: 0, posY: 0, scheduleId: '', flag: '', date: '' },
});

// week post할 땐 변수 따로쓰자
export const weeklyPostData = atom({
  key: 'weeklyPostData',
  default: null,
});
