import { useMutation, useQueryClient } from 'react-query';
import { patchDayToRescheduleSchedules } from 'src/lib/api/dayApi';
import { patchWeeklySchedules } from 'src/lib/api/weekApi';
import { dailyPlanFlag, Schedule } from 'src/types';

interface usePatchWeeklySchedulesParams {
  scheduleId: string;
  schedule: Schedule;
  date?: string;
  hoverDate?: string;
}

// 일간 -> 미룰계획 (미룰 계획에 추가 / 계획에서 삭제)
const usePatchWeeklySchedules = ({
  scheduleId,
  schedule,
  date,
  hoverDate,
}: usePatchWeeklySchedulesParams) => {
  const queryClient = useQueryClient();
  return useMutation(async () => patchWeeklySchedules({ scheduleId, date: date as string }), {
    onMutate: async () => {
      // 기존 데이터 안고 있기
      const snapShotOfPreviousData = queryClient.getQueryData(['daily', date]);

      //to date optimistic update
      await queryClient.cancelQueries(['daily', date]);

      //  미룰 계획에 추가
      await queryClient.setQueryData(['daily'], (oldSchedules: any) => {
        const optimisticData = [...oldSchedules?.data?.data?.schedules];
        optimisticData.push(schedule);
        return optimisticData;
      });

      // from date optimistic update
      await queryClient.cancelQueries(['daily', hoverDate]);
      //  기존 계획에서 삭제
      await queryClient.setQueryData(['daily', hoverDate], (oldSchedules: any) => {
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
      // queryClient.invalidateQueries(['reschedule', 'daily', date]);
      queryClient.invalidateQueries(['daily', date]);
      queryClient.invalidateQueries(['daily', hoverDate]);
    },
  });
};

export default usePatchWeeklySchedules;
