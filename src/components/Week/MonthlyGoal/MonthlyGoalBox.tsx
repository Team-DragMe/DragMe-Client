import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import MonthlyGoalInput from './MonthlyGoalInput';

function MonthlyGoalBox() {
  const testData = { content: '이번주도 화이팅' };
  return (
    <Styled.Root>
      <p>MONTHLY GOAL</p>
      <Styled.Wrapper>
        <MonthlyGoalInput monthlygoal={testData} />
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
