import React from 'react';
import { useRecoilValue } from 'recoil';
import useGetMonthlyGoalData from 'src/hooks/query/useGetMonthlyGoalData';
import { weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import MonthlyGoalInput from './MonthlyGoalInput';

function MonthlyGoalBox() {
  const week = useRecoilValue(weekInfo);
  const startDate = week[0] === 'T' ? '' : week[0].slice(0, 7) + '-01';
  const { data } = useGetMonthlyGoalData({ startDate });
  const monthlyGoal = data?.data.value;

  return (
    <Styled.Root>
      <p>MONTHLY GOAL</p>
      <Styled.Wrapper>
        <MonthlyGoalInput monthlygoal={monthlyGoal} date={startDate} />
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
      width: 100%;
      text-align: center;
    }
  `,
  Wrapper: styled.div`
    width: 24.3rem;
    & > input {
      display: none;
    }
  `,
};
