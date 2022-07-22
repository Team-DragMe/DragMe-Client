import { useMutation, useQueryClient } from 'react-query';
import { patchRoutineToDaySchedules, patchroutineToDaySchedules } from 'src/lib/api/dayApi';
import { dailyPlanFlag, FlagedData, Schedule, UnWrappingData } from 'src/types';

interface usePatchRoutineToDayParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverFlag: dailyPlanFlag | null;
}

// 자주 사용하는 계획 -> 일정 (일정에 추가 / 자주 사용하는 계획에서 삭제)
const usePatchRoutineToDay = ({
  scheduleId,
  schedule,
  date,
  hoverFlag,
}: usePatchRoutineToDayParams) => {
  const queryClient = useQueryClient();
  return useMutation(async () => patchRoutineToDaySchedules({ scheduleId, date }), {
    onMutate: async () => {
      const snapShotOfPreviousData = queryClient.getQueryData('routine');
      await queryClient.cancelQueries(['routine']);
      await queryClient.cancelQueries(['daily', date]);
      //  일정에 추가
      queryClient.setQueryData(['daily'], (oldSchedules: any) => {
        console.log('>>oldSchedules', oldSchedules?.data?.data?.schedules);
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        return optimisticData;
      });
      //  자주 사용하는 계획 에서 삭제
      queryClient.setQueryData(['routine', date], (oldSchedules: any) => {
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
      queryClient.invalidateQueries('routine');
      queryClient.invalidateQueries(['daily', date]);
    },
  });
};

export default usePatchRoutineToDay;
