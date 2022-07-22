import Image from 'next/image';
import Logo from 'public/assets/lotties/Onboarding.gif';
import React from 'react';
import styled from 'styled-components';

function OnBoardingPage() {
  return (
    <Styled.Root>
      <Styled.LogoContainer>
        <Image src={Logo} alt="온보딩 로고" width={'1440'} height={'900'} />
      </Styled.LogoContainer>
      <Styled.GradientArea>
        <Styled.SubText>Find one&#39;s own direction</Styled.SubText>
      </Styled.GradientArea>
    </Styled.Root>
  );
}
export default OnBoardingPage;
const Styled = {
  Root: styled.div`
    position: relative;
    width: 100%;
    height: 84rem;
    display: flex;
    flex-direction: column;
  `,
  LogoContainer: styled.div`
    z-index: -1;
    position: absolute;
    width: 100%;
    bottom: 1.2rem;
  `,
  SubText: styled.p`
    position: absolute;
    z-index: 8;
    width: 27.4rem;
    left: 50%;
    bottom: 6rem;
    transform: translateX(-50%);

    font-style: normal;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 2rem;

    color: rgba(20, 54, 151, 0.2);
  `,
  GradientArea: styled.div`
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 84rem;

    background: linear-gradient(0deg, #dadff7 0%, #dadff7 0.01%, rgba(218, 223, 247, 0) 59.94%);
  `,
};
