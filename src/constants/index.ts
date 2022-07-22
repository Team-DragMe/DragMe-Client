import { dailyPlanFlag } from 'src/types';

export const PLAN_CHIP = {
  PARENT: 'draggableParent',
  CHILD: 'draggableChild',
};

type flagKeyType = 'DAILY' | 'ROUTINE' | 'RECHEDULE' | 'WEEKLY' | 'CHILD';

export const FLAG: Record<flagKeyType, dailyPlanFlag> = {
  DAILY: 'daily',
  ROUTINE: 'routine',
  RECHEDULE: 'rechedule',
  WEEKLY: 'weekly',
  CHILD: 'child',
};
