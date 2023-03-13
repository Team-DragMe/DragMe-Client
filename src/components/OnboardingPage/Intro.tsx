import Image from 'next/image';
import OnboardingBackground from 'public/assets/onboardingBackground.png';
import StartBtn from 'public/assets/StartBtn.svg';
import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function OnboardingIntro() {
  return (
    <Styled.Root>
      <Styled.IntroductionText>
        내 모든 일정을 한눈에, 빠르고 간편하게 관리하세요.
        <br />
        이제껏 경험하지 못했던 <Styled.underline>성장과정</Styled.underline>에 초점을 맞춘 서비스.
        <br />
        <br />
        드래그미와 함께, <Styled.underline>느슨하지만 단단한 일정관리</Styled.underline>로
        <br /> 새로운 일상을 맞이해보세요.
        <br />
      </Styled.IntroductionText>
      <Styled.StartButton />
      <Styled.BtnText>구글 로그인으로 바로 시작하기</Styled.BtnText>
      <Image
        src={OnboardingBackground}
        alt="백그라운드"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </Styled.Root>
  );
}
export default OnboardingIntro;

const Styled = {
  Root: styled.div`
    position: relative;
    width: 100%;
    height: 41.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  IntroductionText: styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 170%;

    text-align: center;
    letter-spacing: -0.02em;
  `,
  StartButton: styled(StartBtn)`
    color: ${theme.category.cate_white};
    transform: translateX(8%);
    margin-top: 3rem;
  `,
  underline: styled.span`
    border-bottom: 0.2rem solid ${theme.colors.letter_black};
  `,
  BtnText: styled.div`
    position: absolute;
    width: 30rem;
    height: 5.4rem;
    color: ${theme.category.cate_white};
    left: 42%;
    bottom: 13.5%;

    font-weight: 500;
    font-size: 22px;
    line-height: 140%;
    cursor: pointer;
  `,
};
