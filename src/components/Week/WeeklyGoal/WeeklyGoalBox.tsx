import { useRouter } from 'next/router';
import React from 'react';
import useGetWeeklyGoalData from 'src/hooks/query/useGetWeeklyGoalData';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import WeeklyGoalInput from './WeeklyGoalInput';

interface weeklyGoalType {
  date: string;
  type: string;
  value: string;
}

const parseToValidQuery = (query: string | string[] | undefined) => {
  if (!query) return '';
  if (Array.isArray(query)) return '';

  return query;
};

function WeeklyGoalBox() {
  const router = useRouter();
  const startDate = parseToValidQuery(router.query?.week).slice(0, 10);
  const { data } = useGetWeeklyGoalData({ startDate });
  const weeklyGoalList = data?.data;

  return (
    <Styled.Root>
      <span>WEEKLY GOAL</span>
      <Styled.Wrapper>
        {weeklyGoalList?.map((el: weeklyGoalType, idx: number) => (
          <WeeklyGoalInput key={el.type} idx={idx} content={el.value} />
        ))}
      </Styled.Wrapper>
    </Styled.Root>
  );
}

export default WeeklyGoalBox;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    width: 24.3rem;
    align-items: center;
    & > span {
      font-size: 1.6rem;
      font-weight: 800;
      line-height: 150%;
      color: ${theme.colors.letter_black};
      margin-bottom: 0.8rem;
    }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    & > input {
      display: none;
    }
  `,
};
