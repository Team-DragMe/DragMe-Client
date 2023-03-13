import Image from 'next/image';
import Link from 'next/link';
import BackgroundFooter from 'public/assets/Background_footer.png';
import StartBtn from 'public/assets/StartBtn.svg';
import React from 'react';
import { theme } from 'src/styles/theme';
import { getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

function Footer() {
  return (
    <Styled.Root>
      <Styled.GradientArea>
        <Image
          src={BackgroundFooter}
          alt="백그라운드"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <Styled.Title>
          DRAG ME를 통해
          <br />
          목표에 도달할 준비가 되셨나요?
          <Styled.StartButton />
        </Styled.Title>
      </Styled.GradientArea>
      <Styled.BtnText>구글 로그인으로 바로 시작하기</Styled.BtnText>
    </Styled.Root>
  );
}
export default Footer;

const Styled = {
  Root: styled.div`
    position: relative;
    width: 144rem;
    height: 41.8rem;
    border-top: 1rem solid #f2f4f6;
  `,
  GradientArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: linear-gradient(0deg, #dadff7 0%, #dadff7 0.01%, rgba(218, 223, 247, 0) 69.94%);
  `,
  Title: styled.div`
    z-index: 1;
    margin-left: 18rem;
    position: relative;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 140%;
    color: ${theme.colors.letter_black};
    transform: translateY(-50%);

    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 23rem;
      height: 0.3rem;
      left: 0rem;
      top: 107%;
      background: ${theme.colors.letter_black};
    }
  `,
  StartButton: styled(StartBtn)`
    color: ${theme.category.cate_white};
    position: absolute;
    left: -0.5rem;
    top: 11rem;
    cursor: pointer;
  `,
  BtnText: styled.div`
    position: absolute;
    width: 30rem;
    height: 5.4rem;
    z-index: 999;
    color: ${theme.category.cate_white};
    left: 46%;
    bottom: 28%;
    font-weight: 500;
    font-size: 22px;
    line-height: 140%;
    cursor: pointer;
  `,
};
