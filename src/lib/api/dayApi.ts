import { CalendarQueryType, DateQueryType } from 'src/types/day';
import { CalendarQueryType, InformationRequestType } from 'src/types/day';

import { client } from './api';

export const getCalendarData = async ({ month }: CalendarQueryType) => {
  const { data } = await client.get(`/schedule/calendar?month=${month}`);

  return { data };
};

export const getTodayNoteData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/information/days?date=${date}`);

  return { data };
};

export const postInformationData = async (data: InformationRequestType) =>
  await client.post('/information', { ...data });
