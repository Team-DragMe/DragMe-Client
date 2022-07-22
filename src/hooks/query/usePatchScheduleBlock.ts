import { useMutation, useQueryClient } from 'react-query';
import { patchScheduleBlock, postScheduleBlock } from 'src/lib/api/dayApi';
import { dailyPlanFlag } from 'src/types';
import { TitleAndScheduleId } from 'src/types/day';
import { v1 } from 'uuid';

interface usePatchScheduleBlockParams extends TitleAndScheduleId {
  flag?: dailyPlanFlag;
  date?: string;
}

// 해당하는 flag에 대해서만 invalidated 시키도록
const usePatchScheduleBlock = ({
  title,
  scheduleId,
  flag,
  date = '',
}: usePatchScheduleBlockParams) => {
  const queryClient = useQueryClient();
  const queryKeys = [flag] as string[];
  if (flag === 'daily') {
    queryKeys.push(date);
  }

  return useMutation(async () => patchScheduleBlock({ scheduleId, title }), {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKeys);
      const snapShotOfPreviousData = queryClient.getQueryData(queryKeys);

      // 캐싱된 일정데이터에 접근하여 일정에 추가
      queryClient.setQueryData(queryKeys, (oldSchedules: any) => {
        const newData = oldSchedules?.data?.data?.schedules?.map((item, idx) => {
          if (item._id === scheduleId) {
            return {
              title,
              ...item,
            };
          }
          return item;
        });
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
  });
};

export default usePatchScheduleBlock;
