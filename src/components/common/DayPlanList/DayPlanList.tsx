import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import AddDayPlanChip from '../DayPlanChip/AddDayPlanChip';
import DayPlan from './DayPlan';

interface DayPlanListProps {
  schedules: any;
  [key: string]: any;
}

function DayPlanList({ schedules, ...props }: DayPlanListProps) {
  return (
    <Styled.Root {...props}>
      <Styled.UlWrapper>
        <Styled.Ul>
          {schedules.map((item) => (
            <DayPlan item={item} key={item._id} />
          ))}
        </Styled.Ul>
      </Styled.UlWrapper>
      <Styled.AddDayPlanChipWrapper>
        <AddDayPlanChip />
      </Styled.AddDayPlanChipWrapper>
    </Styled.Root>
  );
}

export default DayPlanList;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 23rem;
  `,
  UlWrapper: styled.article`
    max-height: 44.9rem;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  Ul: styled.ul`
    min-height: 44.9rem;
    width: 21rem;
  `,
  AddDayPlanChipWrapper: styled.div`
    padding-top: 0.8rem;
    border-top: 1px solid ${theme.colors.plan_grey01};
    width: 21rem;
  `,
};
