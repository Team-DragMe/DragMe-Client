import { useQuery } from 'react-query';
import { getWeeklyGoalData } from 'src/lib/api/weekApi';
import { StartDateQuery } from 'src/types/week';

const useGetWeeklyGoalData = ({ startDate }: StartDateQuery) =>
  useQuery(
    ['weeklyGoal', startDate],
    async () =>
      getWeeklyGoalData({
        startDate,
      }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
    },
  );

export default useGetWeeklyGoalData;
