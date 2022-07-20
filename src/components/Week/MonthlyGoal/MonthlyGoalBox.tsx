import React from 'react';
import { useRecoilValue } from 'recoil';
import useGetMonthlyGoalData from 'src/hooks/query/useGetMonthlyGoalData';
import { weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import MonthlyGoalInput from './MonthlyGoalInput';

function MonthlyGoalBox() {
  const weekDate = useRecoilValue(weekInfo);
  console.log(weekDate);
  // const startDate = weekDate.slice(0, 10);
  // console.log(startDate);
  const { data } = useGetMonthlyGoalData({ startDate: '2022-07-13' });
  const monthlyGoal = data?.data.value;

  return (
    <Styled.Root>
      <p>MONTHLY GOAL</p>
      <Styled.Wrapper>
        <MonthlyGoalInput monthlygoal={monthlyGoal} />
      </Styled.Wrapper>
    </Styled.Root>
  );
}

export default MonthlyGoalBox;

const Styled = {
  Root: styled.div`
    width: 24.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > p {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 150%;
      color: ${theme.colors.letter_black};
      margin-bottom: 1rem;
      width: 12.7rem;
    }
  `,
  Wrapper: styled.div`
    width: 24.3rem;
    & > input {
      display: none;
    }
  `,
};
