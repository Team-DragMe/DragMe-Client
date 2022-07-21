import { useQuery } from 'react-query';
import { getSubScheduleData } from 'src/lib/api/dayApi';

interface UseGetSubSchedules {
  scheduleId: string;
  isAbled: boolean;
}

const useGetSubSchedules = ({ scheduleId, isAbled }: UseGetSubSchedules) =>
  useQuery(
    ['subSchedule', scheduleId],
    async () =>
      getSubScheduleData({
        scheduleId,
      }),
    {
      select: (data) => data?.data?.data?.schedules,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
      enabled: isAbled,
    },
  );

export default useGetSubSchedules;
