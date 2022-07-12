import PlusBtn from 'public/assets/icons/PlusBtn.svg';
import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function AddDayPlanChip() {
  return (
    <Styled.Root>
      <PlusBtn />
    </Styled.Root>
  );
}

export default AddDayPlanChip;

const Styled = {
  Root: styled.div`
    width: 100%;
    height: 3.2rem;
    border: 1px solid ${theme.colors.plan_grey01};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};
