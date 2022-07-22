import { useMutation, useQueryClient } from 'react-query';
import { patchDayToRoutineSchedules } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchDayToRoutineParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverFlag: dailyPlanFlag | null;
}

// 일간 -> 자주 사용하는계획 (자주 사용하는 계획에 추가 / 계획에서 삭제)
const usePatchDayToRoutine = ({
  scheduleId,
  schedule,
  date,
  hoverFlag,
}: usePatchDayToRoutineParams) => {
  const queryClient = useQueryClient();
  return useMutation(async () => patchDayToRoutineSchedules({ scheduleId }), {
    onMutate: async () => {
      console.log('>>>schedule', schedule);
      console.log('>>>scheduleId', scheduleId);
      console.log('>>>date', date);
      const snapShotOfPreviousData = queryClient.getQueryData('routine');
      await queryClient.cancelQueries(['routine']);
      //  자주 사용하는 계획에 추가 - 잘 됨
      await queryClient.setQueriesData(['routine'], (oldSchedules: any) => {
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        console.log('>>optimisticData 자주 사용하는 계획에 추가', optimisticData);
        return optimisticData;
      });

      // 장애 발생 시 스냅샷을 반환
      return {
        snapShotOfPreviousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['routine']);
    },
  });
};

export default usePatchDayToRoutine;
