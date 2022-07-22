export type categoryColorCodeType =
  | '#7B8DD8'
  | '#DCADC8'
  | '#EAC96E'
  | '#95B39C'
  | '#F67F6F'
  | '#FFFFFF'
  | '#96CCC9';

export type dailyPlanFlag = 'daily' | 'routine' | 'reschedule' | 'weekly' | 'child';

export interface Schedule {
  _id: string;
  date: string;
  title: string;
  categoryColorCode: categoryColorCodeType;
  userId: string;
  isCompleted: boolean;
  isReschedule: boolean;
  isRoutine: boolean;
  orderIndex: number;
  // @TODO timeSets 형식 수정
  estimatedTime: number[];
  usedTime: number[];
  subSchedules: Schedule[];
  createdAt: string;
  updatedAt: string;
  // react Query에서 데이터 가공해서 넣기
  flag?: dailyPlanFlag;
  isFake?: boolean;
}

export interface SubSchedules {
  parentId: string;
  subSchedules: Schedule[];
}

export interface SchedulDataWrapper {
  schedules: Schedule[];
}

export interface FlagedData {
  data?: {
    data: {
      data: SchedulDataWrapper;
    };
  };
  type: dailyPlanFlag;
}

export interface UnWrappingData {
  data?: {
    data: SchedulDataWrapper;
  };
}
