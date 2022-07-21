import { useMutation, useQueryClient } from 'react-query';
import { patchCompleteScheduleData } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchCompletedSchedulesParams {
  scheduleId: string;
  schedule: Schedule;
  date: string;
}

// 계획 -> 미룰계획 (미룰 계획에 추가 / 계획에서 삭제)
const usePatchCompletedSchedules = ({
  scheduleId,
  schedule,
  date,
}: usePatchCompletedSchedulesParams) => {
  const queryClient = useQueryClient();
  return useMutation(patchCompleteScheduleData, {
    onMutate: async () => {
      await queryClient.cancelQueries('reschedule' as dailyPlanFlag);
      const snapShotOfPreviousData = queryClient.getQueryData('reschedule');
      //  미룰 계획에 추가
      queryClient.setQueryData('reschedule', (oldSchedules: any) => {
        const optimisticData = [...oldSchedules];
        optimisticData.push(schedule);
        return optimisticData;
      });
      //  기존 계획에서 삭제
      queryClient.setQueryData(['daily', date], (oldSchedules: any) => {
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

export default usePatchCompletedSchedules;
