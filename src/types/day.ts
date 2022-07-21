export interface CalendarQueryType {
  month: string;
}

export interface CalendarQueryKeyType {
  currentMonth: { year: number; month: number };
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
