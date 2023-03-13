import Image from 'next/image';
import Logo from 'public/assets/lotties/Onboarding.gif';
import React from 'react';
import styled from 'styled-components';

function OnBoardingPage() {
  return (
    <Styled.Root>
      <Image src={Logo} alt="main logo" width={1440} height={900} />
      <Styled.SubText>Find one&#39;s own direction</Styled.SubText>
      <Styled.Description>
        느슨하지만 단단한 플랜 서비스로
        <br /> 나다움의 방향성을 찾아가다.
      </Styled.Description>
    </Styled.Root>
  );
}
export default OnBoardingPage;
const Styled = {
  Root: styled.div`
    position: relative;
    width: 144rem;
    height: 89rem;
  `,
  SubText: styled.p`
    position: absolute;
    left: 50%;
    bottom: 8rem;
    transform: translateX(-50%);

    font-style: normal;
    font-weight: 700;
    font-size: 2.4rem;

    color: rgba(20, 54, 151, 0.2);
  `,
  Description: styled.p`
    position: absolute;
    left: 4rem;
    top: 9.7rem;
    font-style: normal;

    font-weight: bold;
    font-size: 3.2rem;
    line-height: 150%;
    letter-spacing: -0.05em;
  `,
};
