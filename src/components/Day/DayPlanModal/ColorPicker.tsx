import ToggleButton from 'public/assets/ToggleButton.svg';
import { useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import ColorListModal from './ColorListModal';

function ColorPicker() {
  const [isOpened, setisOpened] = useState(false);
  const [color, setColor] = useState('#FFFFFF');

  const handleClickColor = (value: string) => {
    setColor(value);
  };

  return (
    <Styled.Root>
      <Styled.Selector>
        <Styled.Selected color={color} />
        <Styled.WrapTogglebutton onClick={() => setisOpened(!isOpened)}>
          <ToggleButton />
        </Styled.WrapTogglebutton>
      </Styled.Selector>
      {isOpened ? <ColorListModal setColor={handleClickColor} /> : <></>}
    </Styled.Root>
  );
}

export default ColorPicker;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 0.4rem;
  `,
  Selector: styled.div`
    position: relative;
    width: 2.8rem;
    height: 1.2rem;
    border-radius: 0.2rem;
    border: 0.05rem solid ${theme.colors.plan_grey};
    padding-left: 0.4rem;
    padding-right: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      align-items: flex-start;
    }
  `,

  Selected: styled.div<{ color: string }>`
    width: 0.8rem;
    height: 0.8rem;
    padding: 0rem;
    border: 0rem;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    border: ${({ color }) =>
      color === '#FFFFFF' ? `0.02rem solid ${theme.colors.letter_grey}` : 'none'};
  `,

  WrapTogglebutton: styled.div`
    width: 0.7rem;
    height: 0.6rem;
    padding: 0;
    margin: 0;
    gap: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
