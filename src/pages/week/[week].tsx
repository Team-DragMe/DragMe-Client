import React from 'react';
import styled from 'styled-components';

import NavBar from '../../components/common/NavBar';
import WeekChange from '../../components/Week/WeekChange';
import WeekInfo from '../../components/Week/WeekInfo';

function Week() {
  return (
    <Styled.Root>
      <NavBar />
      <WeekInfo />
      <WeekChange />
    </Styled.Root>
  );
}

export default Week;

const Styled = {
  Root: styled.div``,
};
