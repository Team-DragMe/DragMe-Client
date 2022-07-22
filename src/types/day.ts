import { categoryColorCodeType, Schedule } from '.';

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

export interface ScheduleId {
  scheduleId: string;
}

export interface ScheduleTimePostType {
  scheduleId: string;
  isUsed: boolean;
  timeBlockNumbers: number[];
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
  title: string;
  categoryColorCode: categoryColorCodeType;
  isRoutine: boolean;
}

export interface TitleAndScheduleId {
  title: string;
  scheduleId: string;
}
