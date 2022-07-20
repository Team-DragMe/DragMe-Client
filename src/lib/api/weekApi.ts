import { WeeklyGoalQueryType } from 'src/types/week';

import { client } from './api';

export const getWeeklyGoalData = async ({ startDate }: WeeklyGoalQueryType) => {
  const { data } = await client.get(`/information/weeks?date=${startDate}`);

  return { data };
};
