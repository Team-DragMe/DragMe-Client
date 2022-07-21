import React from 'react';
import WeekPlan from 'src/components/Week/WeekPlan/WeekPlan';
import styled from 'styled-components';

import WeekChange from '../../components/Week/WeekChange';
import WeekInfo from '../../components/Week/WeekInfo';

function Week() {
  return (
    <Styled.Root>
      <WeekInfo />
      <WeekChange />
      <WeekPlan></WeekPlan>
    </Styled.Root>
  );
}

export default Week;

const Styled = {
  Root: styled.div``,
};
