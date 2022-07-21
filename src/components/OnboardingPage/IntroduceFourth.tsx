import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function IntroduceFourth() {
  return (
    <Styled.Root>
      <Styled.DescriptionSection>
        <Styled.Title>
          자주 세우는 계획을
          <br /> Routin Road에 저장하다
        </Styled.Title>
        <Styled.SubTitle>
          자주 세우는 계획을 드래그 앤 드롭으로 간편하게 꺼내 쓰세요.
        </Styled.SubTitle>
        <Styled.Detail>드래그미가 당신을 위한 Routin Road를 마련해 놓을게요.</Styled.Detail>
      </Styled.DescriptionSection>
      <Styled.LottieWrapper>이건로티다</Styled.LottieWrapper>
    </Styled.Root>
  );
}
export default IntroduceFourth;

const Styled = {
  Root: styled.div`
    width: 100%;
    position: relative;
    height: 70rem;
  `,
  DescriptionSection: styled.div`
    position: absolute;
    text-align: right;
    width: 50rem;
    height: 22.9rem;
    right: 9.3rem;
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
      width: 22.7rem;
      height: 1.8rem;
      right: 2.2rem;
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
    width: 66.4rem;
    height: 41.6rem;
    right: 63.2rem;
    top: 50%;
    transform: translateY(-50%);

    border: 0.5rem solid ${theme.colors.letter_black};
    border-radius: 1rem;
  `,
};
