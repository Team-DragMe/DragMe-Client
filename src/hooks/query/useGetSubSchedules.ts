import { useQuery } from 'react-query';
import { getSubScheduleData } from 'src/lib/api/dayApi';
import { dailyPlanFlag } from 'src/types';
import { getFlagedData } from 'src/utils/getFlagedData';

interface UseGetSubSchedules {
  scheduleId: string;
  isAbled: boolean;
  flag: dailyPlanFlag;
}

const useGetSubSchedules = ({ scheduleId, isAbled, flag }: UseGetSubSchedules) =>
  useQuery(
    ['child', scheduleId],
    async () =>
      getSubScheduleData({
        scheduleId,
      }),
    {
      select: (data) => getFlagedData({ data, type: flag }),
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
      enabled: isAbled,
    },
  );

export default useGetSubSchedules;
