import { useMutation } from 'react-query';
import { deleteScheduleData } from 'src/lib/api/dayApi';
import { ScheduleId } from 'src/types/day';

const useDeleteSchedule = () => {
  const mutation = useMutation(async (data: ScheduleId) => deleteScheduleData(data));

  return mutation;
};

export default useDeleteSchedule;
