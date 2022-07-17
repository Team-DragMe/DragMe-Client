import { useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface colorInfo {
  id: number;
  color: string;
}

const colorList: colorInfo[] = [
  { id: 1, color: theme.category.cate_white },
  { id: 2, color: theme.category.cate_mint },
  { id: 3, color: theme.category.cate_green },
  { id: 4, color: theme.category.cate_blue },
  { id: 5, color: theme.category.cate_corarl },
  { id: 6, color: theme.category.cate_pink },
  { id: 7, color: theme.category.cate_yellow },
  { id: 8, color: theme.category.cate_purple },
];

interface ColorListModalProps {
  setColor: (value: string) => void;
}
function ColorListModal({ setColor }: ColorListModalProps) {
  const [category, setCategory] = useState<string>('');
  const handleChangeCategory = (color: string) => {
    console.log(color);
    setCategory(color);
    setColor(color);
    //TODO: 서버에 컬러코드 값 보내는 api 붙이기
  };
  return (
    <Styled.Box>
      <Styled.ColorBox>
        {colorList.map((info: colorInfo) => (
          <Styled.Color
            key={info.id}
            colorName={info.color}
            onClick={() => handleChangeCategory(info.color)}
          />
        ))}
      </Styled.ColorBox>
    </Styled.Box>
  );
}

export default ColorListModal;

const Styled = {
  Box: styled.section`
    position: absolute;
    top: 1.9rem;
    width: 2.8rem;
    height: 5.4rem;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.25);
    padding: 0.5rem 0.4rem;
    background-color: ${theme.category.cate_white};
    z-index: 3;
  `,
  ColorBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: space-between;
    padding: 0;
  `,
  Color: styled.div<{ colorName: string }>`
    width: 0.8rem;
    height: 0.8rem;
    padding: 0rem;
    margin: 0rem;
    border: 0rem;
    border-radius: 50%;
    background-color: ${({ colorName }) => colorName};
    border: ${({ colorName }) =>
      colorName === '#FFFFFF' ? `0.02rem solid ${theme.colors.letter_grey}` : 'none'};
  `,
};
