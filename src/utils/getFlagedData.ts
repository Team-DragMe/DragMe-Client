import { dailyPlanFlag, Schedule } from 'src/types';

interface SchedulDataWrapper {
  schedules: Schedule[];
}

interface FloagedData {
  data?: {
    data: {
      data: SchedulDataWrapper;
    };
  };
  type: dailyPlanFlag;
}

export const getFlagedData = ({ data, type }: FloagedData) => {
  const organizedData = data?.data?.data?.schedules.map((obj) => ({ ...obj, flag: type }));
  return organizedData;
};
