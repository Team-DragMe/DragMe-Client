import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function IntroduceSecond() {
  return (
    <Styled.Root>
      <Styled.DescriptionSection>
        <Styled.Title>
          더블드래그로 단단하게
          <br /> 성장 과정을 기록하다
        </Styled.Title>
        <Styled.SubTitle>계획 완료 후에 시간 블록을 한 번 더 드래그 해보세요.</Styled.SubTitle>
        <Styled.Detail>
          당신의 계획 시간과 실제 이행 시간을 함께 기록해 <br /> 당신의 삶의 패턴을 확인해드릴게요.
        </Styled.Detail>
      </Styled.DescriptionSection>
      <Styled.LottieWrapper>이건로티다</Styled.LottieWrapper>
    </Styled.Root>
  );
}
export default IntroduceSecond;

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
      width: 15.1rem;
      height: 1.8rem;
      right: 15rem;
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
