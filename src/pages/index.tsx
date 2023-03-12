import React from 'react';
import Footer from 'src/components/OnboardingPage/Footer';
import Header from 'src/components/OnboardingPage/Header';
import Intro from 'src/components/OnboardingPage/Intro';
import IntroduceFirst from 'src/components/OnboardingPage/IntroduceFirst';
import IntroduceFourth from 'src/components/OnboardingPage/IntroduceFourth';
import IntroduceSecond from 'src/components/OnboardingPage/IntroduceSecond';
import IntroduceThird from 'src/components/OnboardingPage/IntroduceThird';
import styled from 'styled-components';

function OnboardingPage() {
  return (
    <Styled.Root>
      <Header />
      <Intro />
      <IntroduceFirst />
      <IntroduceSecond />
      <IntroduceThird />
      <IntroduceFourth />
      <Footer />
    </Styled.Root>
  );
}
export default OnboardingPage;
const Styled = {
  Root: styled.div`
    width: 144rem;
    margin: 0.5rem auto;
  `,
};
