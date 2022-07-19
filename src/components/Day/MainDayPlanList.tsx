import React from 'react';
import { useSetRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import { schedules } from 'src/mock-data/schedules';
import { dailyPlanList } from 'src/states';

import DayPlanList from '../common/DayPlanList/DayPlanList';

function MainDayPlanList() {
  // 일간 리스트에서 뿌릴 데이터는 여기에서 보냄 -> query key를 DailyTodos
  // 서버에서 가져오는 데이터를 뿌림 -> post요청 이후에 새로운 index 배열로 업데이트
  // Mutation할 때 DailyTodos 쿼리 삭제 -> 새로운 인덱스 배열로 setQueryData하기
  // @TODO useQuery로 일일 planList 가져오기
  const dailyPlanData = useSetRecoilState(dailyPlanList);

  // useQuery로 가져온 schedules를 리코일 값에 set했다고 가정
  dailyPlanData(schedules);

  return <DayPlanList schedules={schedules} flag={FLAG.DAILY} />;
}

export default MainDayPlanList;
