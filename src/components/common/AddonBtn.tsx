import ActiveAddon from 'public/assets/icons/ActiveAddon.svg';
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalClickXY } from 'src/states';
import { dailyPlanFlag } from 'src/types';
import styled from 'styled-components';

interface AddonBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  scheduleId: string;
  flag: dailyPlanFlag;
  date: string;
}

function AddonBtn(props: AddonBtnProps) {
  const { scheduleId, flag, date } = props;
  const [onMouse, setOnMouse] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [posXY, setPosXY] = useRecoilState(modalClickXY);

  useEffect(() => {
    if (posXY.posX === 0 && posXY.posY === 0) {
      setIsClick(false);
      setOnMouse(false);
    }
  }, [posXY]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isClick) {
      setPosXY({ posX: 0, posY: 0, scheduleId: '', flag, date: '' });
    } else {
      setPosXY({ posX: e.pageX, posY: e.pageY, scheduleId, flag, date });
    }
    setIsClick((prev) => !prev);
  };

  const handleMouseOver = () => {
    setOnMouse(true);
  };
  const handleMouseLeave = () => {
    if (!isClick) {
      setOnMouse(false);
    }
  };
  return (
    <Styled.Button onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} {...props}>
      {onMouse && <ActiveAddon onClick={handleClick} />}
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
