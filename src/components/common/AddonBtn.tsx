import ActiveAddon from 'public/assets/icons/ActiveAddon.svg';
import React, { ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface AddonBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function AddonBtn(props: AddonBtnProps) {
  const [onMouse, setOnMouse] = useState(false);

  const handleMouseOver = () => {
    setOnMouse(true);
  };
  const handleMouseLeave = () => {
    setOnMouse(false);
  };
  return (
    <Styled.Button onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} {...props}>
      {onMouse && <ActiveAddon />}
    </Styled.Button>
  );
}

export default AddonBtn;

const Styled = {
  Button: styled.button`
    width: 2rem;
    height: 2rem;
    /* remove default styles */
    outline: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
    font: inherit;
  `,
};