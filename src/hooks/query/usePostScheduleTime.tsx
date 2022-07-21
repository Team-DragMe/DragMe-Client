import { useMutation } from 'react-query';
import { postScheduleTime } from 'src/lib/api/dayApi';
import { ScheduleTimePostType } from 'src/types/day';

const usePostScheduleTime = () => {
  const mutation = useMutation(async (data: ScheduleTimePostType) => postScheduleTime(data));

  return mutation;
};

export default usePostScheduleTime;
