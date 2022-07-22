import { useMutation, useQueryClient } from 'react-query';
import { deleteScheduleData } from 'src/lib/api/dayApi';
import { Schedule } from 'src/types';
import { deleteRefetching } from 'src/types/day';

const useDeleteSchedule = ({ scheduleId, flag, date }: deleteRefetching) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date || '');
  }

  return useMutation(async () => deleteScheduleData({ scheduleId }), {
    onMutate: async () => {
      const snapShotOfPreviousData = queryClient.getQueryData(queryKeys);
      await queryClient.cancelQueries(queryKeys);

      // 캐싱된 일정데이터에 접근하여 일정에 추가
      queryClient.setQueryData(queryKeys, (oldSchedules: any) => {
        const newData = oldSchedules?.data?.data?.schedules.filter(
          (o: Schedule) => o._id !== scheduleId,
        );
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

export default useDeleteSchedule;
