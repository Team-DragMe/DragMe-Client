import React from 'react';
import DragLottie from 'src/components/OnboardingPage/lotties/Drag1';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function IntroduceFirst() {
  return (
    <Styled.Root>
      <Styled.DescriptionSection>
        <Styled.Title>
          단순한 드래그로
          <br /> 시간 설정이 간편해지다.
        </Styled.Title>
        <Styled.SubTitle>타임블록을 가볍게 드래그 해보세요.</Styled.SubTitle>
        <Styled.Detail>
          번거로운 시간 설정이 아닌, 간편한 인터렉션으로
          <br />
          시간 설정의 번거로움을 덜어드릴게요.
        </Styled.Detail>
      </Styled.DescriptionSection>
      <Styled.LottieWrapper>
        <DragLottie />
      </Styled.LottieWrapper>
    </Styled.Root>
  );
}
export default IntroduceFirst;

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
      width: 18rem;
      height: 1.8rem;
      left: 0;
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
    border-bottom: 0.1rem solid ${theme.colors.plan_grey};
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
    padding-left: 0.3rem;
    position: absolute;
    width: 67rem;
    height: 42rem;
    left: 63.2rem;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 0.5rem solid ${theme.colors.letter_black};
    border-radius: 1rem;
    color: white;
  `,
};
