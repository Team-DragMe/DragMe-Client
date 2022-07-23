import { useMutation } from 'react-query';
import { patchReschedule } from 'src/lib/api/dayApi';
import { ScheduleId } from 'src/types/day';

const usePatchReschedule = () => {
  const mutation = useMutation(async (data: ScheduleId) => patchReschedule(data));

  return mutation;
};

export default usePatchReschedule;
