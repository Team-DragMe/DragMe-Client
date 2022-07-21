import { useQuery } from 'react-query';
import { getRoutineScheduleData } from 'src/lib/api/dayApi';
import { getFlagedData } from 'src/utils/getFlagedData';

const useGetRoutineSchedules = () =>
  useQuery(['routineSchedule'], async () => getRoutineScheduleData(), {
    select: (data) => getFlagedData({ data, type: 'routine' }),
    keepPreviousData: true,
    useErrorBoundary: true,
    retry: 3,
    suspense: false,
  });

export default useGetRoutineSchedules;
