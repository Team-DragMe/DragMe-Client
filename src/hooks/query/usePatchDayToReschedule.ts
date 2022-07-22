import { useMutation, useQueryClient } from 'react-query';
import { patchDayToRescheduleSchedules } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchDayToRescheduleParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverFlag: dailyPlanFlag;
}

// 일간 -> 미룰계획 (미룰 계획에 추가 / 계획에서 삭제)
const usePatchDayToReschedule = () => {
  const queryClient = useQueryClient();
  return useMutation(patchDayToRescheduleSchedules, {
    onMutate: async ({ scheduleId, schedule, date, hoverFlag }: usePatchDayToRescheduleParams) => {
      console.log('>>>schedule', schedule);
      console.log('>>>scheduleId', scheduleId);
      console.log('>>>date', date);
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      // await queryClient.cancelQueries('reschedule' as dailyPlanFlag);
      console.log('>>>snapShotOfPreviousData', snapShotOfPreviousData);
      //  미룰 계획에 추가
      queryClient.setQueriesData(['reschedule'], (oldSchedules: any) => {
        const optimisticData = [...oldSchedules];
        optimisticData.push(schedule);
        return optimisticData;
      });
      //  기존 계획에서 삭제
      queryClient.setQueriesData(['daily', date], (oldSchedules: any) => {
        console.log('>>daily의 옛날 쿼리', oldSchedules);
        const newData = oldSchedules.filter((o: Schedule) => o._id !== scheduleId);
        return newData;
      });
      // 장애 발생 시 스냅샷을 반환
      return {
        snapShotOfPreviousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries('reschedule');
      queryClient.invalidateQueries('daily');
    },
  });
};

export default usePatchDayToReschedule;
