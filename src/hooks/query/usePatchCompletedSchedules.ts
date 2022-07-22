import { useMutation, useQueryClient } from 'react-query';
import { patchCompleteScheduleData } from 'src/lib/api/dayApi';
import { dailyPlanFlag } from 'src/types';

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
      await queryClient.cancelQueries(flag);
      await queryClient.cancelQueries(['child', scheduleId]);
      const snapShotOfPreviousData = queryClient.getQueryData(flag);

      // 장애 발생 시 스냅샷을 반환
      return {
        snapShotOfPreviousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(flag);
      queryClient.invalidateQueries(['child', scheduleId]);
    },
  });
};

export default usePatchCompletedSchedules;
