import Image from 'next/image';
import Logo from 'public/assets/lotties/Onboarding.gif';
import React from 'react';
import styled from 'styled-components';

function OnBoardingPage() {
  return (
    <Styled.Root>
      <Image src={Logo} alt="main logo" width={1440} height={900} />
      <Styled.SubText>Find one&#39;s own direction</Styled.SubText>
    </Styled.Root>
  );
}
export default OnBoardingPage;
const Styled = {
  Root: styled.div`
    position: relative;
    width: 144rem;
    height: 90rem;
    display: flex;
    flex-direction: column;
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
};
