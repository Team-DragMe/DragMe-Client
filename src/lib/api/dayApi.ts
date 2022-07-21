import { CalendarQueryType, DateQueryType, ScheduleId, InformationRequestType } from 'src/types/day';

import { client } from './api';

export const getCalendarData = async ({ month }: CalendarQueryType) => {
  const { data } = await client.get(`/schedule/calendar?month=${month}`);

  return { data };
};

export const getTodayNoteData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/information/days?date=${date}`);

  return { data };
};

export const getTodayScheduleData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/schedule/days?date=${date}`);
  return { data };
};

export const getDelayedScheduleData = async () => {
  const { data } = await client.get('/schedule/delay');
  return { data };
};

export const getRoutineScheduleData = async () => {
  const { data } = await client.get('/schedule/routine');
  return { data };
};

export const getSubScheduleData = async ({ scheduleId }: ScheduleId) => {
  const { data } = await client.get(`/schedule/subschedule?scheduleId=${scheduleId}`);
  return { data };
};

export const postInformationData = async (data: InformationRequestType) => {
  const post = await client.post('/information', { ...data });

  return post;
};
