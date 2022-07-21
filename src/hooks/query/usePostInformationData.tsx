import { useMutation } from 'react-query';
import { postInformationData } from 'src/lib/api/dayApi';
import { InformationRequestType } from 'src/types/day';

const usePostInformationData = () => {
  const mutation = useMutation(async (data: InformationRequestType) => postInformationData(data));

  return mutation;
};

export default usePostInformationData;
