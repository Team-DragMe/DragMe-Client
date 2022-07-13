import React from 'react';
import RoutineBox from 'src/components/common/RoutineBox';
import MainDayPlan from 'src/components/Day/MainDayPlanList';
import Reschedule from 'src/components/Day/Reschedule';
import styled from 'styled-components';

function Day() {
  return (
    <Styled.Root>
      <div>
        <MainDayPlan />
        <Reschedule />
      </div>
      <div>
        <RoutineBox />
      </div>
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div`
    margin-left: 1rem;
    display: flex;
    & > section {
      margin-bottom: 6.1rem;
    }
  `,
};
