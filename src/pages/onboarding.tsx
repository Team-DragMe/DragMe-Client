import Image from 'next/image';
import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

// import OnboardingBackround from '../../public/assets/onboardingBackground.svg';

function OnBoardingPage() {
  return (
    <Styled.Root>
      <Styled.OnboardingPageHeader>
        <Styled.HeaderSloganPage>
          <Styled.SloganText>
            느슨하지만 단단한 플랜서비스로
            <br /> 나다움의 방향성을 찾아가다.
          </Styled.SloganText>
        </Styled.HeaderSloganPage>
        <Styled.HeaderGradientArea>
          <Styled.SubText>Find ones own direction</Styled.SubText>
        </Styled.HeaderGradientArea>
      </Styled.OnboardingPageHeader>
      <Styled.MiniIntroduction>
        <Styled.IntroductionText>
          내 모든 일정을 한눈에, 빠르고 간편하게 관리하세요.
          <br />
          이제껏 경험하지 못했던 <Styled.underline>성장과정</Styled.underline>에 초점을 맞춘 서비스.
          <br />
          <br />
          드래그미와 함께, <Styled.underline>느슨하지만 단단한 일정관리</Styled.underline>로
          <br /> 새로운 일상을 맞이해보세요.
        </Styled.IntroductionText>

        <Image
          src="/public/assets/onboardingBackground.svg"
          alt="백그라운드"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Styled.MiniIntroduction>
      <Styled.DescriptionSection>
        <Styled.OddNumberDescription>
          <Styled.OddLottieDescriptionArea>
            <h1>
              단순한 드래그로
              <br />
            </h1>
          </Styled.OddLottieDescriptionArea>
          <Styled.OddLottieWrapper>이건로티다</Styled.OddLottieWrapper>
        </Styled.OddNumberDescription>
        <Styled.EvenNumberDescription>
          <Styled.EvenLottieDescriptionArea>로티설명임</Styled.EvenLottieDescriptionArea>
          <Styled.EvenLottieWrapper>이건로티다</Styled.EvenLottieWrapper>
        </Styled.EvenNumberDescription>
      </Styled.DescriptionSection>
      <Styled.OddNumberDescription>
        <Styled.OddLottieDescriptionArea>
          <h1>안녕하세요</h1>
        </Styled.OddLottieDescriptionArea>
        <Styled.OddLottieWrapper>이건로티다</Styled.OddLottieWrapper>
      </Styled.OddNumberDescription>
      <Styled.EvenNumberDescription>
        <Styled.EvenLottieDescriptionArea>로티설명임</Styled.EvenLottieDescriptionArea>
        <Styled.EvenLottieWrapper>이건로티다</Styled.EvenLottieWrapper>
      </Styled.EvenNumberDescription>
      <Styled.Footer>이것은 푸터다.</Styled.Footer>
    </Styled.Root>
  );
}
export default OnBoardingPage;
const Styled = {
  Root: styled.div`
    width: 100%;
  `,
  OnboardingPageHeader: styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
  `,
  HeaderSloganPage: styled.div`
    height: 32.2rem;
    font-size: 3.2rem;
  `,
  SloganText: styled.p`
    position: absolute;
    width: 39rem;
    height: 8.6rem;
    left: 4rem;
    top: 15.7rem;

    font-style: normal;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 120%;

    letter-spacing: -0.05em;
  `,
  SubText: styled.p`
    position: absolute;
    width: 27.4rem;
    height: 1.998rem;
    left: 50%;
    top: 82.009rem;
    transform: translateX(-50%);

    font-style: normal;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 2rem;

    color: rgba(20, 54, 151, 0.2);
  `,
  HeaderGradientArea: styled.div`
    width: 100%;
    height: 51.8rem;

    background: linear-gradient(0deg, #dadff7 0%, #dadff7 0.01%, rgba(218, 223, 247, 0) 59.94%);
  `,
  MiniIntroduction: styled.div`
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
  underline: styled.span`
    border-bottom: 0.2rem solid ${theme.colors.letter_black};
  `,
  DescriptionSection: styled.div`
    width: 100%;
  `,
  EvenNumberDescription: styled.div`
    position: relative;
    height: 70rem;
  `,
  OddNumberDescription: styled.div`
    position: relative;
    height: 70rem;
    background: #f5f5f5;
  `,
  OddLottieDescriptionArea: styled.div`
    position: absolute;
    width: 37rem;
    height: 22.9rem;
    right: 931px;
    top: 50%;
    border: 1px solid ${theme.colors.letter_black};
  `,
  EvenLottieDescriptionArea: styled.div`
    position: absolute;
    width: 37rem;
    height: 22.9rem;
    left: 931px;
    top: 50%;
    border: 1px solid ${theme.colors.letter_black};
  `,
  OddLottieWrapper: styled.div`
    position: absolute;
    width: 66.4rem;
    height: 41.6rem;
    left: 63.2rem;
    top: 50%;
    transform: translateY(-50%);

    border: 1px solid ${theme.colors.letter_black};
  `,
  EvenLottieWrapper: styled.div`
    position: absolute;
    width: 67.2rem;
    height: 41.7rem;
    left: 14rem;
    top: 50%;
    transform: translateY(-50%);

    border: 1px solid ${theme.colors.letter_black};
  `,
  Footer: styled.div`
    height: 59rem;
  `,
};
