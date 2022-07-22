import { useMutation, useQueryClient } from 'react-query';
import { patchCompleteScheduleData } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchCompletedSchedulesParams {
  scheduleId: string;
  flag: dailyPlanFlag;
  isCompleted?: boolean;
  date?: string;
}
// 해당하는 flag에 대해서만 invalidated 시키도록
const usePatchCompletedSchedules = ({
  scheduleId,
  flag,
  date = '',
  isCompleted,
}: usePatchCompletedSchedulesParams) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date);
  }

  return useMutation(async () => patchCompleteScheduleData({ scheduleId, isCompleted }), {
    onMutate: async () => {
      console.log('>뮤테이션 훅으로 들어왓는지', scheduleId, flag);
      await queryClient.cancelQueries(flag);
      const snapShotOfPreviousData = queryClient.getQueryData(flag);
      // // optimistic update
      // queryClient.setQueryData(queryKeys, (oldSchedules: any) => {
      //   const newResult = oldSchedules?.data?.data?.schedules.map((schedule: Schedule) => {
      //     if (schedule._id === scheduleId) {
      //       return {
      //         ...schedule,
      //         isCompleted,
      //       };
      //     }
      //     return schedule;
      //   });
      //   return newResult;
      // });
      // 장애 발생 시 스냅샷을 반환
      return {
        snapShotOfPreviousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(flag);
    },
  });
};

export default usePatchCompletedSchedules;
