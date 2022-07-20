import { useQuery } from 'react-query';
import { getCalendarData } from 'src/lib/api/dayApi';
import { CalendarQueryKeyType } from 'src/types/day';

const useCalendarData = ({ currentMonth }: CalendarQueryKeyType) =>
  useQuery(
    ['month', currentMonth],
    async () =>
      getCalendarData({
        month: `${currentMonth.year}-${
          currentMonth.month > 9 ? currentMonth.month : '0' + currentMonth.month
        }`,
      }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 0,
      suspense: false,
    },
  );

export default useCalendarData;
