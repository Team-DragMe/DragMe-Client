import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import WeeklyGoalInput from './WeeklyGoalInput';

function WeeklyGoalBox() {
  const testData = [
    { type: 'weeklyGoal0', value: '' },
    { type: 'weeklyGoal1', value: '' },
    { type: 'weeklyGoal2', value: '' },
    { type: 'weeklyGoal3', value: '' },
    { type: 'weeklyGoal4', value: '' },
    { type: 'weeklyGoal5', value: '' },
    { type: 'weeklyGoal6', value: '' },
    { type: 'weeklyGoal7', value: '' },
    { type: 'weeklyGoal8', value: '' },
    { type: 'weeklyGoal9', value: '' },
  ];
  return (
    <Styled.Root>
      <span>WEEKLY GOAL</span>
      <Styled.Wrapper>
        {testData?.map((el, idx) => (
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
