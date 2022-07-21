import { useQuery } from 'react-query';
import { getTodayScheduleData } from 'src/lib/api/dayApi';
import { DateQueryType } from 'src/types/day';

const useGetTodaySchedule = ({ date }: DateQueryType) =>
  useQuery(
    ['todaySchedule', date],
    async () =>
      getTodayScheduleData({
        date,
      }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
    },
  );

export default useGetTodaySchedule;
