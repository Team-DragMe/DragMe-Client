import { useMutation } from 'react-query';
import { postTimeBlock } from 'src/lib/api/dayApi';
import { ScheduleTimePostType } from 'src/types/day';

const usePostTimeBlock = () => {
  const mutation = useMutation(async (data: ScheduleTimePostType) => postTimeBlock(data));

  return mutation;
};

export default usePostTimeBlock;
