import { useRouter } from 'next/router';
import React from 'react';
import useGetMonthlyGoalData from 'src/hooks/query/useGetMonthlyGoalData';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import MonthlyGoalInput from './MonthlyGoalInput';

const parseToValidQuery = (query: string | string[] | undefined) => {
  if (!query) return '';
  if (Array.isArray(query)) return '';

  return query;
};

function MonthlyGoalBox() {
  const router = useRouter();
  const startDate = parseToValidQuery(router.query?.week).slice(0, 10);
  const { data } = useGetMonthlyGoalData({ startDate });
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
