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
      // select 옵션으로 데이터 가공 가능
      select: (data) => {
        console.log(data.data);
        return data.data;
      },
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 0,
      suspense: true,
    },
  );

export default useCalendarData;
