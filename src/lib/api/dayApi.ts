import { start } from 'repl';
import { CalendarQueryType, DateQueryType, InformationRequestType, getEmojiQueryType } from 'src/types/day';

import { client } from './api';

export const getCalendarData = async ({ month }: CalendarQueryType) => {
  const { data } = await client.get(`/schedule/calendar?month=${month}`);

  return { data };
};

export const getTodayNoteData = async ({ date }: DateQueryType) => {
  const { data } = await client.get(`/information/days?date=${date}`);

  return { data };
};

export const postInformationData = async (data: InformationRequestType) => {
  const post = await client.post('/information', { ...data });

  return post;
};

export const getEmojiListData = async ({ startDate, endDate }: getEmojiQueryType) => {
  const { data } = await client.get(`/information/emoji?startDate=${startDate}&endDate=${endDate}`);

  return { data };
};
