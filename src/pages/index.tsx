import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function Home() {
  return <Styled.Root>안녕얘들아</Styled.Root>;
}

export default Home;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.main};
  `,
};
