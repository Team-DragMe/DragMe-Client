import { useMutation, useQueryClient } from 'react-query';
import { patchCompleteScheduleData } from 'src/lib/api/dayApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePostInformationDataParams {
  scheduleId: string;
  flag: dailyPlanFlag;
  isCompleted: boolean;
  date?: string;
}
// 해당하는 flag에 대해서만 invalidated 시키도록
const usePostInformationData = ({
  scheduleId,
  flag,
  isCompleted,
  date = '',
}: usePostInformationDataParams) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date);
  }
  return useMutation(patchCompleteScheduleData, {
    onMutate: async () => {
      await queryClient.cancelQueries(flag);
      const snapShotOfPreviousData = queryClient.getQueryData(flag);
      // optimistic update
      queryClient.setQueryData(queryKeys, (oldSchedules: any) =>
        oldSchedules.map((schedule: Schedule) => {
          if (schedule._id === scheduleId) {
            return {
              ...schedule,
              isCompleted,
            };
          }
          return schedule;
        }),
      );
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

export default usePostInformationData;