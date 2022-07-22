import React from 'react';
import RescheduleLottie from 'src/components/OnboardingPage/lotties/Reschedule';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function IntroduceThird() {
  return (
    <Styled.Root>
      <Styled.DescriptionSection>
        <Styled.Title>
          우회하기를 통해
          <br /> 시간 관리의 유연성을 얻다.
        </Styled.Title>
        <Styled.SubTitle>미처 수행하지 못한 계획은 다음에 생각해도 좋아요.</Styled.SubTitle>
        <Styled.Detail>
          드래그미가 계획 이행에 대한 부담감을 줄여줘
          <br />
          &#39;나만의 방향성&#39;을 찾도록 도와드릴게요.
        </Styled.Detail>
      </Styled.DescriptionSection>
      <Styled.LottieWrapper>
        <RescheduleLottie />
      </Styled.LottieWrapper>
    </Styled.Root>
  );
}
export default IntroduceThird;

const Styled = {
  Root: styled.div`
    width: 100%;
    position: relative;
    height: 70rem;
    background: #f5f5f5;
  `,
  DescriptionSection: styled.div`
    position: absolute;
    width: 37rem;
    height: 22.9rem;
    left: 9.3rem;
    top: 47%;
  `,
  Title: styled.div`
    z-index: 1;
    position: relative;
    font-weight: 800;
    font-size: 3.4rem;
    line-height: 140%;
    margin-bottom: 3rem;
    letter-spacing: -0.01em;
    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 12rem;
      height: 1.8rem;
      left: -0.2rem;
      top: 27%;

      background: rgba(182, 191, 239, 0.4);
    }

    color: ${theme.colors.letter_black};
  `,

  SubTitle: styled.div`
    display: inline-block;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 140%;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid ${theme.colors.plan_grey};
    color: ${theme.colors.letter_black};
  `,
  Detail: styled.div`
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 140%;
    margin-top: 1.8rem;
    letter-spacing: -0.05em;
    color: ${theme.colors.letter_black};
  `,

  Underline: styled.span`
    border-bottom: 0.2rem solid ${theme.colors.plan_grey};
  `,
  LottieWrapper: styled.div`
    position: absolute;
    width: 67.5rem;
    height: 42.3rem;
    left: 63.2rem;
    top: 50%;
    transform: translateY(-50%);
    padding-top: 0.0245rem;
    padding-left: 0.1rem;

    border: 0.5rem solid ${theme.colors.letter_black};
    border-radius: 1rem;
    background: white;
    color: white;
  `,
};
