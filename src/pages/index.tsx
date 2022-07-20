import styled from 'styled-components';

import NavBar from '../components/common/NavBar';
import DayChange from '../components/Day/DayInfoSection/DayChange';
import DayInfo from '../components/Day/DayInfoSection/DayInfo';

function Home() {
  return (
    <Styled.Root>
      <NavBar />
      <DayInfo />
      <DayChange />
    </Styled.Root>
  );
}

export default Home;

const Styled = {
  Root: styled.div``,
};
