import React from 'react';
import MainDayPlan from 'src/components/Day/MainDayPlanList';
import { schedules } from 'src/mock-data/schedules';
import styled from 'styled-components';

function Day() {
  return (
    <Styled.Root>
      데이페이지입니다.
      <MainDayPlan schedules={schedules} />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
