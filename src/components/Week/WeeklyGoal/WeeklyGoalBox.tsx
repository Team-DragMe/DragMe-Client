import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import WeeklyGoalInput from './WeeklyGoalInput';

function WeeklyGoalBox() {
  return (
    <Styled.Root>
      <span>WEEKLY GOAL</span>
      <Styled.Wrapper>
        {new Array(7).fill(1).map((el, idx) => (
          <WeeklyGoalInput key={el * 2} idx={idx} />
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
    width: 20.6rem;
    & > input {
      display: none;
    }
  `,
};
