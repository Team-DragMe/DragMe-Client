import { useQuery } from 'react-query';
import { getEmojiListData } from 'src/lib/api/dayApi';
import { getEmojiQueryType } from 'src/types/day';

const useEmojiListData = ({ startDate, endDate }: getEmojiQueryType) =>
  useQuery(
    ['emoji', startDate, endDate],
    async () =>
      getEmojiListData({
        startDate: startDate,
        endDate: endDate,
      }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 0,
      suspense: false,
      enabled: startDate !== '' && endDate !== '',
    },
  );

export default useEmojiListData;
