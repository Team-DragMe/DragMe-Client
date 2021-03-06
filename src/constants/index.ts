import { dailyPlanFlag } from 'src/types';

export const PLAN_CHIP = {
  PARENT: 'draggableParent',
  CHILD: 'draggableChild',
};

type flagKeyType = 'DAILY' | 'ROUTINE' | 'reschedule' | 'WEEKLY' | 'CHILD';

export const FLAG: Record<flagKeyType, dailyPlanFlag> = {
  DAILY: 'daily',
  ROUTINE: 'routine',
  reschedule: 'reschedule',
  WEEKLY: 'weekly',
  CHILD: 'child',
};
