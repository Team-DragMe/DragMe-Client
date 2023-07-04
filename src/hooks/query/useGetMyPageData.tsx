import { useQuery } from 'react-query';
import { getMypage } from 'src/lib/api/mypageApi';
import { DateQueryType } from 'src/types/day';
import { getFlagedData } from 'src/utils/getFlagedData';

const useGetMyPageData = () =>
  useQuery(['myInfo'], async () => getMypage(), {
    select: (data) => data.data,
    keepPreviousData: true,
    useErrorBoundary: true,
    retry: 3,
    suspense: false,
  });

export default useGetMyPageData;
