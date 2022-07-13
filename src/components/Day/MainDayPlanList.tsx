import React from 'react';
import { schedules } from 'src/mock-data/schedules';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import AddDayPlanChip from '../common/AddDayPlanChip';
import MainDayPlan from './MainDayPlan';

function MainDayPlanList() {
  return (
    <Styled.Root>
      <Styled.UlWrapper>
        <Styled.Ul>
          {schedules.map((item) => (
            <MainDayPlan item={item} key={item._id} />
          ))}
        </Styled.Ul>
      </Styled.UlWrapper>
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
