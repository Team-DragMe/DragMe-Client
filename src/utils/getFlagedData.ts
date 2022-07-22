import { FlagedData } from 'src/types';

export const getFlagedData = ({ data, type }: FlagedData) => {
  const organizedData = data?.data?.data?.schedules.map((obj) => ({ ...obj, flag: type }));
  return organizedData;
};
