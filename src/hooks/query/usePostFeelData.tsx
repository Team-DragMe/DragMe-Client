import { useMutation } from 'react-query';
import { postFeelData } from 'src/lib/api/dayApi';
import { FeelRequestType } from 'src/types/day';

const usePostFeelData = () => {
  const mutation = useMutation(async (data: FeelRequestType) => postFeelData(data));

  return mutation;
};

export default usePostFeelData;
