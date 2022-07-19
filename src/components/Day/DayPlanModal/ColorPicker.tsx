import ToggleButton from 'public/assets/ToggleButton.svg';
import { useEffect, useRef, useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import ForwardColorListModal from './ColorListModal';

interface ColorPickerProps {
  newColor: string;
  handleChangeColor: (newColor: string) => void;
}

function ColorPicker(props: ColorPickerProps) {
  const { handleChangeColor, newColor } = props;
  const [isOpened, setisOpened] = useState(false);
  const colorModalRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(newColor);
  const handleClickColor = (value: string) => {
    setColor(value);
    handleChangeColor(value);
    setisOpened && setisOpened(false);
  };

  const useOutsideAlert = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
          if (ref.current && !ref.current.contains(event.target)) {
            setisOpened(false);
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlert(colorModalRef);
  return (
    <Styled.Root>
      <Styled.Selector onClick={() => setisOpened(!isOpened)}>
        <Styled.Selected color={color} />
        <Styled.WrapTogglebutton>
          <ToggleButton />
        </Styled.WrapTogglebutton>
      </Styled.Selector>
      {isOpened && (
        <ForwardColorListModal
          ref={colorModalRef}
          setNewColor={handleClickColor}
          handleChangeColor={handleChangeColor}
        />
      )}
    </Styled.Root>
  );
}

export default ColorPicker;

const Styled = {
  Root: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 0.2rem;
    position: relative;
  `,
  Selector: styled.div`
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
