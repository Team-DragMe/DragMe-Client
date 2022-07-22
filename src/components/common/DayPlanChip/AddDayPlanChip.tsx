import PlusBtn from 'public/assets/icons/PlusBtn.svg';
import React, { ButtonHTMLAttributes } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface AddDayPlanChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  [key: string]: any;
}

function AddDayPlanChip({ onClick, ...props }: AddDayPlanChipProps) {
  return (
    <Styled.Root onClick={onClick} {...props}>
      <PlusBtn />
    </Styled.Root>
  );
}

export default AddDayPlanChip;

const Styled = {
  Root: styled.button`
    width: 100%;
    height: 3.2rem;
    border: 1px solid ${theme.colors.plan_grey};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.category.cate_white};
    cursor: pointer;
  `,
};
