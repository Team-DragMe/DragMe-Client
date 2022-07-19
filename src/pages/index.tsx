import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import NavBar from '../components/common/NavBar';

function Home() {
  return (
    <Styled.Root>
      <NavBar />
    </Styled.Root>
  );
}

export default Home;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.main_color};
  `,
};
