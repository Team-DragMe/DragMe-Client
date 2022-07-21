import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import useGetTodaySchedule from 'src/hooks/query/useGetTodaySchedule';
import { schedules } from 'src/mock-data/schedules';
import { dailyPlanList, dayInfo } from 'src/states';

import DayPlanList from '../common/DayPlanList/DayPlanList';

function MainDayPlanList() {
  // 일간 리스트에서 뿌릴 데이터는 여기에서 보냄 -> query key를 DailyTodos
  // 서버에서 가져오는 데이터를 뿌림 -> post요청 이후에 새로운 index 배열로 업데이트
  // Mutation할 때 DailyTodos 쿼리 삭제 -> 새로운 인덱스 배열로 setQueryData하기
  // @TODO useQuery로 일일 planList 가져오기

  const dailyPlanData = useSetRecoilState(dailyPlanList);
  const date = useRecoilValue(dayInfo).slice(0, 10);
  const { data } = useGetTodaySchedule({ date });

  useEffect(() => {
    console.log('>>>day data NEW', data);
    dailyPlanData(data);
  }, [data, dailyPlanData]);

  return <DayPlanList flag={FLAG.DAILY} schedulesData={data} />;
}

export default MainDayPlanList;
