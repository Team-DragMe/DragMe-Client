import styled from 'styled-components';

import NavBar from '../components/common/NavBar';
import DayInfo from '../components/Day/DayInfoSection/DayInfo';

function Home() {
  return (
    <Styled.Root>
      <NavBar />
      <DayInfo />
    </Styled.Root>
  );
}

export default Home;

const Styled = {
  Root: styled.div``,
};
