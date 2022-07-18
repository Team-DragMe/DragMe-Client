import React from 'react';
import styled from 'styled-components';

import NavBar from '../../components/common/NavBar';
import DayPlanSettingModal from '../../components/Day/DayPlanSettingModal';

function Day() {
  return (
    <Styled.Root>
      <NavBar />
      <DayPlanSettingModal />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
