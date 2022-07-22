import { useQuery } from 'react-query';
import { getTodayNoteData } from 'src/lib/api/dayApi';
import { DateQueryType } from 'src/types/day';

const useGetTodayNoteData = ({ date }: DateQueryType) =>
  useQuery(
    ['todayNote', date],
    async () =>
      getTodayNoteData({
        date,
      }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
      useErrorBoundary: true,
      retry: 3,
      suspense: false,
    },
  );

export default useGetTodayNoteData;
