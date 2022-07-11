import vercel from 'public/vercel.svg';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function Home() {
  console.log(vercel);
  return (
    <Styled.Root>
      <TT />
      안녕얘들아
    </Styled.Root>
  );
}

export default Home;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.main};
  `,
};

const TT = styled(vercel)``;
