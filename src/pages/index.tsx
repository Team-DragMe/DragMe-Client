import TodayPlan from 'src/components/Day/TodayPlan';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function Home() {
  return (
    <Styled.Root>
      <TodayPlan />
    </Styled.Root>
  );
}

export default Home;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.main};
  `,
};
