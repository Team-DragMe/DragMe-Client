import React from 'react';
import MainDayPlan from 'src/components/Day/MainDayPlanList';
import Reschedule from 'src/components/Day/Reschedule';
import styled from 'styled-components';

function Day() {
  return (
    <Styled.Root>
      데이페이지입니다.
      <MainDayPlan />
      <Reschedule />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div`
    margin-left: 1rem;
    & > section {
      margin-bottom: 6.1rem;
    }
  `,
};
