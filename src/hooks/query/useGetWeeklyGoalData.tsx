import { useQuery } from 'react-query';
import { getWeeklyGoalData } from 'src/lib/api/weekApi';
import { WeeklyGoalQueryType } from 'src/types/week';

const useGetWeeklyGoalData = ({ startDate }: WeeklyGoalQueryType) =>
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
      retry: 0,
      suspense: false,
    },
  );

export default useGetWeeklyGoalData;
