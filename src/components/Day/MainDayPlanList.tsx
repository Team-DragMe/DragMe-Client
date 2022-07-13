import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import AddDayPlanChip from '../common/AddDayPlanChip';
import MainDayPlan from './MainDayPlan';

interface MainDayPlanListProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  schedules?: any;
}

interface liStyleProps {
  isOpen: boolean;
}
function MainDayPlanList({ schedules }: MainDayPlanListProps) {
  return (
    <Styled.Root>
      <Styled.Ul>
        {schedules.map((item) => (
          <MainDayPlan item={item} key={item._id} />
        ))}
      </Styled.Ul>
      <Styled.AddDayPlanChipWrapper>
        <AddDayPlanChip />
      </Styled.AddDayPlanChipWrapper>
    </Styled.Root>
  );
}

export default MainDayPlanList;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Ul: styled.ul`
    min-height: 44.9rem;
    width: 21.5rem;
    border-bottom: 1px solid ${theme.colors.plan_grey01};
    max-height: 44.9rem;
    overflow-y: scroll;
  `,
  AddDayPlanChipWrapper: styled.div`
    margin-top: 0.8rem;
    width: 21rem;
  `,
};
