import styled from 'styled-components';

import MonthlyGoalBox from './MonthlyGoalBox';

function MonthlyGoal() {
  return (
    <Styled.Root>
      <MonthlyGoalBox />
    </Styled.Root>
  );
}

export default MonthlyGoal;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
};
