import { useQuery } from 'react-query';
import { getTodayScheduleData } from 'src/lib/api/dayApi';
import { DateQueryType } from 'src/types/day';
import { getFlagedData } from 'src/utils/getFlagedData';

const useGetTodaySchedules = ({ date }: DateQueryType) =>
  useQuery(
    ['daily', date],
    async () =>
      getTodayScheduleData({
        date,
      }),
    {
      select: (data) => getFlagedData({ data, type: 'daily' }),
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
    },
  );

export default useGetTodaySchedules;
