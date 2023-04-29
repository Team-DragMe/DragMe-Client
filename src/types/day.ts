import { categoryColorCodeType, dailyPlanFlag, Schedule } from '.';

export interface CalendarQueryType {
  month: string;
}

export interface CalendarQueryKeyType {
  currentMonth: { year: number; month: number };
}

export interface getEmojiQueryType {
  startDate: string;
  endDate: string;
}

export interface InformationRequestType {
  date: string;
  type: string;
  value: string;
}

export interface DateQueryType {
  date: string;
}

export interface PlanDataQueryType {
  type: string;
  planDate: string | string[];
}

export interface ScheduleId {
  scheduleId: string;
}

export interface ScheduleTimePostType {
  scheduleId: string;
  isUsed: boolean;
  timeBlockNumbers: number[];
}

export interface ScheduleTimeDeleteType {
  scheduleId: string;
  timeBlockNumbers: number[];
}

export interface deleteRefetching extends ScheduleId {
  flag: dailyPlanFlag;
  date?: string;
}

export interface ScheduleAndDate {
  scheduleId: string;
  date: string;
}

export interface ScheduleAndIsCompleted {
  scheduleId: string;
  isCompleted: boolean;
}

export interface PatchOrderSchedules {
  scheduleId: string;
  scheduleList: Schedule[];
}

export interface PostScheduleBlock {
  date: string;
  title?: string;
  categoryColorCode: categoryColorCodeType;
  isRoutine?: boolean;
}

export interface TitleAndScheduleId {
  title?: string;
  scheduleId: string;
}

export interface CategoryPatch {
  scheduleId: string;
  categoryColorCode: string;
}
export interface useCategoryPatch extends CategoryPatch {
  flag: dailyPlanFlag;
  date?: string;
}
