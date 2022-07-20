import { StartDateQuery } from 'src/types/week';

import { client } from './api';

export const getWeeklyGoalData = async ({ startDate }: StartDateQuery) => {
  const { data } = await client.get(`/information/weeks?date=${startDate}`);

  return { data };
};

export const getMonthlyGoalData = async ({ startDate }: StartDateQuery) => {
  const { data } = await client.get(`/information/months?date=${startDate}`);

  return { data };
};
