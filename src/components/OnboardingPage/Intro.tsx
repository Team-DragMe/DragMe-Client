import Image from 'next/image';
import OnboardingBackround from 'public/assets/onboardingBackground.png';
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
      </Styled.IntroductionText>
      <Styled.BackgroundWrapper>
        <Image
          src={OnboardingBackround}
          alt="백그라운드"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Styled.BackgroundWrapper>
    </Styled.Root>
  );
}
export default OnboardingIntro;

const Styled = {
  Root: styled.div`
    width: 100%;
    position: relative;
    min-height: 35rem;
    height: 41.8rem;
  `,

  IntroductionText: styled.p`
    z-index: 1;
    position: absolute;
    width: 50.5rem;
    height: 6.8rem;
    left: 50%;
    top: 33%;
    transform: translate(-50%, -50%);

    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 170%;

    text-align: center;
    letter-spacing: -0.02em;
  `,
  BackgroundWrapper: styled.div``,
  underline: styled.span`
    border-bottom: 0.2rem solid ${theme.colors.letter_black};
  `,
};
