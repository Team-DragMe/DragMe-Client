import styled from 'styled-components';
import { theme } from 'styles/theme';

function Home() {
  return <StyledRoot>안녕얘들아</StyledRoot>;
}

export default Home;

const StyledRoot = styled.div`
  width: 100%;
  color: ${theme.colors.main};
  display: flex;
`;
