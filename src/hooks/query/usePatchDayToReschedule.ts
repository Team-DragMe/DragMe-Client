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
      console.log('>>>schedule', schedule);
      console.log('>>>scheduleId', scheduleId);
      console.log('>>>date', date);
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      await queryClient.cancelQueries(['reschedule']);
      //  미룰 계획에 추가 - 잘 됨
      await queryClient.setQueriesData(['reschedule'], (oldSchedules: any) => {
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        console.log('>>optimisticData 미룰 계획에 추가', optimisticData);
        return optimisticData;
      });

      await queryClient.cancelQueries(['daily', date]);
      //  기존 계획에서 삭제 - 안 됨
      await queryClient.setQueriesData(['daily', date], (oldSchedules: any) => {
        const newData = oldSchedules?.data?.data?.schedules.filter(
          (o: Schedule) => o._id !== scheduleId,
        );
        console.log('>>optimisticData 기존 계획에서 삭제', newData);
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
