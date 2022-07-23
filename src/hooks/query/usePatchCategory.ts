import { useMutation, useQueryClient } from 'react-query';
import { patchCategory } from 'src/lib/api/dayApi';
import { Schedule } from 'src/types';
import { useCategoryPatch } from 'src/types/day';

const usePatchCategory = ({ scheduleId, flag, date, categoryColorCode }: useCategoryPatch) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date || '');
  }

  return useMutation(async () => patchCategory({ scheduleId, categoryColorCode }), {
    onMutate: async () => {
      const snapShotOfPreviousData = queryClient.getQueryData(queryKeys);
      await queryClient.cancelQueries(queryKeys);

      // 캐싱된 일정데이터에 접근하여 일정에 추가
      queryClient.setQueryData(queryKeys, (oldSchedules: any) => {
        const newData = oldSchedules?.data?.data?.schedules.map((o: Schedule) => {
          if (o._id === scheduleId) {
            return { ...o, categoryColorCode };
          }
        });
        return newData;
      });
      // 장애 발생 시 스냅샷을 반환
      return {
        snapShotOfPreviousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys);
    },
  });
};
export default usePatchCategory;
