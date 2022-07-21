import { useMutation } from 'react-query';
import { patchScheduleTime } from 'src/lib/api/dayApi';
import { ScheduleTimeDeleteType } from 'src/types/day';

const usePatchScheduleTime = () => {
  const mutation = useMutation(async (data: ScheduleTimeDeleteType) => patchScheduleTime(data));

  return mutation;
};

export default usePatchScheduleTime;
