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

export interface ScheduleAndDate{
  scheduleId: string;
  date: string;
}