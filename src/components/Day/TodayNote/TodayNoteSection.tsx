import { useRecoilValue } from 'recoil';
import useGetTodayNoteData from 'src/hooks/query/useGetTodayNoteData';
import { dayInfo } from 'src/states';
import styled from 'styled-components';

import TodayPlan from '../TodayPlan';
import TodayNote from './TodayNote';
import { todayPlan } from 'src/mock-data/todayPlan';
function TodayNoteSection() {
  const today = useRecoilValue(dayInfo);
  const date = today.slice(0, 10);
  console.log(date);
  console.log(todayPlan);
  // const { data } = useGetTodayNoteData({ date });
  // const todayNoteInfo = data?.data;

  return (
    <Styled.Root>
      <TodayPlan emoji={todayPlan?.emoji || ''} dailyGoal={todayPlan?.dailyGoal || ''} />
      <TodayNote memo={todayPlan?.memo || ''} />
    </Styled.Root>
  );
}

export default TodayNoteSection;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
