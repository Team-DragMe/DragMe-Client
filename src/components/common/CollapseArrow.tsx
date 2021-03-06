import React, { ButtonHTMLAttributes } from 'react';
import { ArrowDownAnimation, ArrowRightAnimation } from 'src/lib/style/animation';
import styled from 'styled-components';

interface CollapseArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpened: boolean;
  className?: string;
}

function CollapseArrow({ isOpened, ...props }: CollapseArrowProps) {
  return (
    <Styled.Root>
      {isOpened ? <Styled.DownArrow {...props} /> : <Styled.RightArrow {...props} />}
    </Styled.Root>
  );
}

export default CollapseArrow;

const ArrowBtn = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  /* remove default styles */
  outline: inherit;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
  font: inherit;
`;
const Styled = {
  Root: styled.div`
    ${ArrowRightAnimation}
    ${ArrowDownAnimation}
  `,
  DownArrow: styled(ArrowBtn)`
    animation: ArrowDown 0.3s forwards;
    background: url('/assets/icons/RightArrow.svg');
  `,
  RightArrow: styled(ArrowBtn)`
    /* animation-duration: 0.1s; */
    animation: ArrowRight 0.3s forwards;
    background: url('/assets/icons/DownArrow.svg');
  `,
};
