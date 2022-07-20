import { CalendarQueryType, InformationRequestType } from 'src/types/day';

import { client } from './api';

export const getCalendarData = async ({ month }: CalendarQueryType) => {
  const { data } = await client.get(`/schedule/calendar?month=${month}`);

  return { data };
};

export const postInformationData = async (data: InformationRequestType) =>
  await client.post('/information', { ...data });
