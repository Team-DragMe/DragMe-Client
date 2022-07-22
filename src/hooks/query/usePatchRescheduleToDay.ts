import { useMutation, useQueryClient } from 'react-query';
import { patchRescheduleToDaySchedules } from 'src/lib/api/dayApi';
import { dailyPlanFlag, FlagedData, Schedule, UnWrappingData } from 'src/types';

interface usePatchRescheduleToDayParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverFlag: dailyPlanFlag | null;
}

// 미룰계획 -> 일정 (일정에 추가 / 미룰계획에서 삭제)
const usePatchRescheduleToDay = ({
  scheduleId,
  schedule,
  date,
  hoverFlag,
}: usePatchRescheduleToDayParams) => {
  const queryClient = useQueryClient();
  return useMutation(async () => patchRescheduleToDaySchedules({ scheduleId, date }), {
    onMutate: async () => {
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      await queryClient.cancelQueries(['reschedule']);
      await queryClient.cancelQueries(['daily', date]);

      //  일정에 추가
      queryClient.setQueryData(['daily', date], (oldSchedules: any) => {
        console.log('>>일정 추가 예옝oldSchedules', oldSchedules?.data?.data?.schedules);
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        return optimisticData;
      });
      //  미룬 계획 에서 삭제
      queryClient.setQueryData(['reschedule'], (oldSchedules: any) => {
        console.log('>>미룬 계획 삭제 예옝oldSchedules', oldSchedules?.data?.data?.schedules);
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
      queryClient.invalidateQueries('reschedule');
      queryClient.invalidateQueries(['daily', date]);
    },
  });
};

export default usePatchRescheduleToDay;
