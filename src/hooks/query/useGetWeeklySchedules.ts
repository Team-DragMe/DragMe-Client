import { useQuery } from 'react-query';
import { getWeeklySchedules } from 'src/lib/api/weekApi';
import { startAndEndDate } from 'src/types/week';
import { getFlagedData } from 'src/utils/getFlagedData';

const useGetWeeklySchedules = ({ startDate, endDate }: startAndEndDate) =>
  useQuery(
    ['week', startDate, endDate],
    async () =>
      getWeeklySchedules({
        startDate,
        endDate,
      }),
    {
      select: (data) => getFlagedData({ data, type: 'daily' }),
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
    },
  );

export default useGetWeeklySchedules;
