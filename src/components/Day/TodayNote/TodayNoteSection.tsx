import styled from 'styled-components';

import TodayPlan from '../TodayPlan';
import TodayNote from './TodayNote';

function TodayNoteSection() {
  return (
    <Styled.Root>
      <TodayPlan />
      <TodayNote />
    </Styled.Root>
  );
}

export default TodayNoteSection;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
