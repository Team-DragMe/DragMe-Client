import { useMutation, useQueryClient } from 'react-query';
import { patchDayToRescheduleSchedules } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchDayToRescheduleParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverFlag: dailyPlanFlag | null;
}

// 일간 -> 미룰계획 (미룰 계획에 추가 / 계획에서 삭제)
const usePatchDayToReschedule = ({
  scheduleId,
  schedule,
  date,
  hoverFlag,
}: usePatchDayToRescheduleParams) => {
  const queryClient = useQueryClient();
  return useMutation(async () => patchDayToRescheduleSchedules({ scheduleId }), {
    onMutate: async () => {
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      await queryClient.cancelQueries(['reschedule']);
      //  미룰 계획에 추가
      await queryClient.setQueryData(['reschedule'], (oldSchedules: any) => {
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        return optimisticData;
      });

      await queryClient.cancelQueries(['daily', date]);
      //  기존 계획에서 삭제
      await queryClient.setQueryData(['daily', date], (oldSchedules: any) => {
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
      // queryClient.invalidateQueries(['reschedule', 'daily', date]);
      queryClient.invalidateQueries(['daily', date]);
      queryClient.invalidateQueries(['reschedule']);
    },
  });
};

export default usePatchDayToReschedule;
