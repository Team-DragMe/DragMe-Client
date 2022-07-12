import React, { useState } from 'react';
import MainDayPlan from 'src/components/Day/MainDayPlan';
import styled from 'styled-components';

function Day() {
  return (
    <Styled.Root>
      데이페이지입니다.
      <MainDayPlan />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
