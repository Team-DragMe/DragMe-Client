import React from 'react';
import styled from 'styled-components';

import NavBar from '../../components/common/NavBar';
import DayInfo from '../../components/Day/DayInfoSection/DayInfo';

function Day() {
  return (
    <Styled.Root>
      <NavBar />
      <DayInfo />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
