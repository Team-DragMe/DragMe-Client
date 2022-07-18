import Image from 'next/image';
import icon_doubleArrow from 'public/assets/icon_doubleArrow.png';
import icon_trashCan from 'public/assets/icon_trashCan.png';
import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function DayPlanSettingModal() {
  const colors = theme.category;

  const colorCode = [
    { id: 0, color: `${colors.cate_mint}` },
    { id: 1, color: `${colors.cate_blue}` },
    { id: 2, color: `${colors.cate_pink}` },
    { id: 3, color: `${colors.cate_purple}` },
    { id: 4, color: `${colors.cate_white}` },
    { id: 5, color: `${colors.cate_green}` },
    { id: 6, color: `${colors.cate_corarl}` },
    { id: 7, color: `${colors.cate_yellow}` },
  ];
  const colorCodes = colorCode.map((code) => (
    <Styled.ColorPicker onClick={() => console.log(code.color)} key={code.id} color={code.color} />
  ));

  return (
    <Styled.Root>
      <Styled.ColorPickerSection>
        <Styled.ColorContainer>{colorCodes}</Styled.ColorContainer>
      </Styled.ColorPickerSection>
      <Styled.ButtonSection>
        <Styled.MenuBox>
          <Styled.ImgWrapper>
            <Image src={icon_doubleArrow} alt="로고이미지" width={'20'} height={'20'} />
          </Styled.ImgWrapper>
          <Styled.ButtonLetter>우회하기</Styled.ButtonLetter>
        </Styled.MenuBox>
        <Styled.MenuBox>
          <Styled.ImgWrapper>
            <Image src={icon_trashCan} alt="로고이미지" width={'20'} height={'20'} />
          </Styled.ImgWrapper>
          <Styled.ButtonLetter>삭제하기</Styled.ButtonLetter>
        </Styled.MenuBox>
      </Styled.ButtonSection>
    </Styled.Root>
  );
}

export default DayPlanSettingModal;

const Styled = {
  Root: styled.div`
    width: 10.2rem;
    height: 12rem;
    background-color: ${theme.category.cate_white};
    margin-top: 10rem;
    margin-left: 10rem;
    display: flex;
    flex-direction: column;

    box-shadow: 1px 1px 20px -5px ${theme.colors.letter_grey};
  `,
  ColorPickerSection: styled.div`
    width: 100%;
    height: 50%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ButtonSection: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    font-size: 1.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  MenuBox: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    border-top: 1px dashed ${theme.colors.letter_grey};
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  ImgWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
  `,
  ButtonLetter: styled.div`
    margin-right: 1rem;
    margin-left: 0.7rem;
    padding-top: 0.2rem;
  `,
  ColorContainer: styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 7.4rem;
    height: 3.6rem;
  `,
  ColorPicker: styled.div`
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.1rem;
    margin-bottom: 0.8rem;
    border-radius: 1rem;
    background-color: ${({ color }) => color};
    border: ${({ color }) => color === '#FFFFFF' && '0.5px solid #B6BEC9'};
  `,
};
