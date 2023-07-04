import { useMutation } from 'react-query';
import { patchMypage } from 'src/lib/api/mypageApi';
import { editInfo } from 'src/types/myPage';

const usePatchMyPageData = () => {
  return useMutation(async (data: editInfo) => patchMypage(data));
};

export default usePatchMyPageData;
