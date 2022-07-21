import React from 'react';
import styled from 'styled-components';

function OnBoardingPage() {
  return (
    <Styled.Root>
      <Styled.SloganContainer />
      <Styled.GradientArea>
        <Styled.SubText>Find one&#39;s own direction</Styled.SubText>
      </Styled.GradientArea>
    </Styled.Root>
  );
}
export default OnBoardingPage;
const Styled = {
  Root: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
  `,
  SloganContainer: styled.div`
    height: 32.2rem;
    font-size: 3.2rem;
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
  GradientArea: styled.div`
    width: 100%;
    height: 51.8rem;

    background: linear-gradient(0deg, #dadff7 0%, #dadff7 0.01%, rgba(218, 223, 247, 0) 59.94%);
  `,
};
