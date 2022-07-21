import { useQuery } from 'react-query';
import { getDelayedScheduleData } from 'src/lib/api/dayApi';
import { getFlagedData } from 'src/utils/getFlagedData';

const useGetDelaySchedules = () =>
  useQuery(['delaySchedule'], async () => getDelayedScheduleData(), {
    select: (data) => getFlagedData({ data, type: 'rechedule' }),
    keepPreviousData: true,
    useErrorBoundary: true,
    retry: 3,
    suspense: false,
  });

export default useGetDelaySchedules;
