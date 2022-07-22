import { useMutation, useQueryClient } from 'react-query';
import { postScheduleBlock } from 'src/lib/api/dayApi';
import { dailyPlanFlag } from 'src/types';
import { PostScheduleBlock } from 'src/types/day';
import { v1 } from 'uuid';

interface usePostScheduleBlockParams extends PostScheduleBlock {
  flag?: dailyPlanFlag;
}

// 해당하는 flag에 대해서만 invalidated 시키도록
const usePostScheduleBlock = ({
  date,
  title,
  categoryColorCode,
  flag,
}: usePostScheduleBlockParams) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date);
  }

  return useMutation(
    async () =>
      postScheduleBlock({ date, title, categoryColorCode, isRoutine: flag === 'routine' }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKeys);
        const snapShotOfPreviousData = queryClient.getQueryData(queryKeys);
        console.log('>>>들어온 것', date, title, categoryColorCode, flag);

        // 캐싱된 일정데이터에 접근하여 일정에 추가
        queryClient.setQueryData(queryKeys, (oldSchedules: any) => {
          const newData = [
            ...oldSchedules?.data?.data?.schedules,
            {
              _id: `oldSchedules?.data?.data?.schedules[0]${v1()}`,
              title,
              categoryColorCode,
              flag,
              subSchedules: [],
              date,
              isComplecated: false,
            },
          ];
          console.log('>>새로운 데이터', newData);
          return newData;
        });

        // 장애 발생 시 스냅샷을 반환
        return {
          snapShotOfPreviousData,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys);
      },
    },
  );
};

export default usePostScheduleBlock;
