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
      console.log('>>>schedule', schedule);
      console.log('>>>scheduleId', scheduleId);
      console.log('>>>date', date);
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      await queryClient.cancelQueries(['reschedule']);
      await queryClient.cancelQueries(['daily', date]);
      console.log('>>>snapShotOfPreviousData', snapShotOfPreviousData);
      //  일정에 추가 - 잘 됨
      queryClient.setQueriesData(['daily'], (oldSchedules: any) => {
        console.log('>>oldSchedules', oldSchedules?.data?.data?.schedules);
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        return optimisticData;
      });
      //  미룬 계획 에서 삭제 - 안됨
      queryClient.setQueriesData(['reschedule', date], (oldSchedules: any) => {
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
