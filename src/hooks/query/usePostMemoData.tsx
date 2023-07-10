import { useMutation } from 'react-query';
import { postMemoData } from 'src/lib/api/dayApi';
import { MemoRequestType } from 'src/types/day';

const usePostMemoData = () => {
  const mutation = useMutation(async (data: MemoRequestType) => postMemoData(data));

  return mutation;
};

export default usePostMemoData;
