import styled from 'styled-components';

function Home() {
  return <Styled.Root />;
}

export default Home;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.main_color};
  `,
};
